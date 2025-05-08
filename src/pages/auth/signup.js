import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { push } from '../../utils/navigationUtils';

const { width, height } = Dimensions.get('window');

const signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const handleSignup = () => {
        if (!name.trim()) {
            Toast.showWithGravity(
                'Please enter your name',
                Toast.LONG,
                Toast.BOTTOM,
            );
            nameInputRef.current.focus();
            return;
        } else if (!email.trim()) {
            Toast.showWithGravity(
                'Please enter your email id',
                Toast.LONG,
                Toast.BOTTOM,
            );
            emailInputRef.current.focus();
            return;
        } else if (!phone.trim()) {
            Toast.showWithGravity(
                'Please enter your phone number',
                Toast.LONG,
                Toast.BOTTOM,
            );
            phoneInputRef.current.focus();
            return;
        } else if (!password.trim()) {
            Toast.showWithGravity(
                'Please enter your password',
                Toast.LONG,
                Toast.BOTTOM,
            );
            passwordInputRef.current.focus();
            return;
        } else if (password !== confirmPassword) {
            Toast.showWithGravity(
                'Passwords do not match',
                Toast.LONG,
                Toast.BOTTOM,
            );
            confirmPasswordInputRef.current.focus();
            return;
        }

    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.loginBox}>
                    <Text style={styles.heading}>Sign Up</Text>
                    <TextInput
                        ref={nameInputRef}
                        style={styles.input}
                        placeholder="Name"
                        onChangeText={setName}
                        value={name}
                    />
                    <TextInput
                        ref={emailInputRef}
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput
                        ref={phoneInputRef}
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        onChangeText={setPhone}
                        value={phone}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            ref={passwordInputRef}
                            placeholder="Password"
                            secureTextEntry={!passwordVisible}
                            onChangeText={setPassword}
                            value={password}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Ionicons
                                name={passwordVisible ? 'eye' : 'eye-off'}
                                size={22}
                                color="#555"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            ref={confirmPasswordInputRef}
                            placeholder="Confirm Password"
                            secureTextEntry={!confirmPasswordVisible}
                            onChangeText={setPassword}
                            value={password}
                        />
                        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            <Ionicons
                                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                                size={22}
                                color="#555"
                            />
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => push('Login')}>
                        <Text style={styles.signupText}>Already have an account? Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default signup

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
    },
    loginBox: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#007BFF',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    heading: {
        fontSize: width > 350 ? 28 : 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.05,
    },
    input: {
        height: 50,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 8,
        width: '100%',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    signupText: {
        color: '#007BFF',
        fontSize: 14,
        textAlign: 'center',
    },
})