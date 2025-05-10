import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-simple-toast';
import { resetandNavigate } from '../utils/navigationUtils';
const { width } = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../context/authContext';


const addBlog = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const isEdit = route.params?.blog;
  const [title, setTitle] = useState(isEdit?.title || '');
  const [description, setDescription] = useState(isEdit?.description || '');
  const [image, setImage] = useState(isEdit?.image ? {
    uri: isEdit.image,
    base64: isEdit.image.replace(/^data:image\/\w+;base64,/, ''),
  } : null);
   const { user } = useContext(AuthContext); 

  const titles = useRef(null);
  const descriptions = useRef(null);

  const handleSave = async () => {

    if (!title.trim()) {
      Toast.showWithGravity(
        'Please enter title',
        Toast.LONG,
        Toast.BOTTOM,
      );
      titles.current.focus();
      return;
    } else if (!description.trim()) {
      Toast.showWithGravity(
        'Please enter description',
        Toast.LONG,
        Toast.BOTTOM,
      );
      descriptions.current?.focus();
      return;
    } else {
       if (!user?.uid) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

      setLoading(true);
      try {
   
        const blogData = {
          title: title.trim(),
          description: description.trim(),
          image: image?.uri || '',
          updatedAt: firestore.FieldValue.serverTimestamp(),
           userId: user.uid, 
        };
        if (isEdit?.id) {
          await firestore().collection('blogs').doc(isEdit.id).update(blogData);

          Toast.show('Blog updated successfully');
          resetandNavigate("Home");
          setLoading(false);
        } else {
          const newBlogData = {
            ...blogData,
            createdAt: firestore.FieldValue.serverTimestamp(),
          };
          await firestore().collection('blogs').add(newBlogData);

          Toast.show('Blog added successfully');
          resetandNavigate("Home");
          setLoading(false);
        }
      } catch (error) {
        console.error('Error saving blog:', error);
        setLoading(false);
        Alert.alert('Error', 'Something went wrong while saving the blog. Please try again.');
      }
    }

  };

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera to take pictures.',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;

  };

  const requestGalleryPermission = async () => {
    if (Platform.Version >= 33) {
      return true;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  const handleGallery = async () => {
    const granted = await requestGalleryPermission();
    console.log('Permission granted?', granted);
    if (!granted) {
      Alert.alert('Permission Denied', 'Gallery permission is required.');
      return;
    }

    console.log('Launching image library...');
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      (response) => {
        console.log('Gallery response:', response);
        if (response.didCancel) {
          console.log('User cancelled gallery');
        } else if (response.errorCode) {
          console.log('Gallery error:', response.errorMessage);
          Alert.alert('Gallery Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          console.log('Image selected:', response.assets[0]);
          const asset = response.assets[0];
          setImage({ uri: asset.uri, base64: asset.base64 });
        } else {
          console.log('No asset returned');
        }
      }
    );
  };

  const handleCamera = async () => {
    const granted = await requestCameraPermission();
    if (!granted) {
      Alert.alert('Permission Denied', 'Camera permission is required.');
      return;
    }

    launchCamera(
      { mediaType: 'photo', saveToPhotos: true },
      (response) => {
        console.log('Camera response:', response);
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera error:', response.errorMessage);
          Alert.alert('Camera Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setImage({ uri: asset.uri, base64: asset.base64 });
        }
      }
    );
  };

  const handleFileUpload = () => {
    Alert.alert('Select Option', 'Choose an option to upload', [
      { text: 'Camera', onPress: handleCamera },
      { text: 'Gallery', onPress: handleGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>{isEdit ? 'Edit Blog' : 'Add Blog'}</Text>

        <View style={styles.loginBox}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            ref={titles}
            style={styles.input}
            placeholder="Enter Title"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            ref={descriptions}
            style={[styles.input, { height: 100 }]}
            placeholder="Enter Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Image</Text>
          <TouchableOpacity style={styles.imageInputBox} onPress={handleFileUpload}>
            {image ? (
              <Image
                source={{ uri: image.uri }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.placeholderText}>Tap to add image</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          {loading && (
            <View style={styles.fullScreenLoader}>
              <ActivityIndicator size="large" color="#007BFF" />
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default addBlog

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  loginBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#007BFF',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: width * 0.04,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: width * 0.04,
    backgroundColor: '#f0f0f0',
  },
  imageInputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    color: '#999',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  fullScreenLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  }
});