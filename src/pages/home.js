import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  RefreshControl,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');


const home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { push } = useNavigation();
  const {logout} = useContext(AuthContext);


  useEffect(() => {
    loadData();
  }, []);

const loadData = async () => {
  try {
    setLoading(true);
    const snapshot = await firestore().collection('blogs').orderBy('createdAt', 'desc').get();
    const blogList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(blogList);
  } catch (error) {
    console.error("Error loading blogs:", error);
  } finally {
    setLoading(false);
  }
};

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData([]); 
      setRefreshing(false);
    }, 1500);
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => logout() },
      ],
      { cancelable: true }
    );
  };

  const handleItemPress = (item) => {
  Alert.alert(
    'Blog Options',
    'What do you want to do?',
    [
      {
        text: 'Edit',
        onPress: () => push('AddBlog', { blog: item }), 
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => confirmDelete(item.id),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    { cancelable: true }
  );
};

const confirmDelete = (id) => {
  console.log("deleteBlog called with id:", id);
  Alert.alert(
    'Confirm Delete',
    'Are you sure you want to delete this blog?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => deleteBlog(id),
      },
    ],
    { cancelable: true }
  );
};

const deleteBlog = async (id) => {
  try {
    await firestore().collection('blogs').doc(id).delete();
    setData(prev => prev.filter(blog => blog.id !== id));
  } catch (error) {
    console.error('Failed to delete blog:', error);
    Alert.alert('Error', 'Something went wrong while deleting.');
  }
};



const renderItem = ({ item }) => (
   <TouchableOpacity onPress={() => handleItemPress(item)}>
  <View style={styles.card}>
    {item.image ? (
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
    ) : null}
    <View style={styles.cardContent}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text numberOfLines={3} ellipsizeMode="tail" style={styles.itemDescription}>
        {item.description}
      </Text>
    </View>
  </View>
  </TouchableOpacity>
);


  return (
        <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutIcon}>
          <Ionicons name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
        ) : data.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.noDataText}>No Data Found</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#007bff']}
                tintColor="#007bff"
              />
            }
          />
        )}
      </View>

      <TouchableOpacity style={styles.fab} onPress={() =>  push('AddBlog')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default home

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: height * 0.08,
  paddingHorizontal: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  borderBottomWidth: 1,
  borderColor: '#ddd',
  },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  loader: {
    marginTop: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: width * 0.045,
    color: '#888',
  },
  listContainer: {
    paddingBottom: 80,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  itemText: {
    fontSize: width * 0.045,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
     width: '100%',
  backgroundColor: '#D3D3D3',
  borderRadius: 12,
  marginVertical: 10,
  overflow: 'hidden',
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
cardImage: {
  width: '100%',
  height: 180,
},
cardContent: {
  padding: 16,
},
itemTitle: {
  fontSize: width * 0.05,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 6,
},
itemDescription: {
  fontSize: width * 0.04,
  color: '#666',
},

})