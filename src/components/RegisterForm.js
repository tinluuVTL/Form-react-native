import React, { useState } from 'react';

import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegisterClick = () => {
    // Kiểm tra tính hợp lệ của dữ liệu đăng ký
    if (username === '' || password === '' || confirmPassword === '') {
      // Hiển thị thông báo lỗi nếu có trường dữ liệu trống
      alert('Vui lòng nhập đầy đủ thông tin đăng ký');
    } else if (password !== confirmPassword) {
      // Hiển thị thông báo lỗi nếu mật khẩu và mật khẩu xác nhận không khớp
      alert('Mật khẩu và mật khẩu xác nhận không khớp');
    } else {
      // Xử lý đăng ký thành công
      setRegistrationSuccess(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.form}>
        <Text style={styles.textIn}>Nhập username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.textIn}>Nhập Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.textIn}>Nhập Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.textIn}>Nhập lại password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Đăng Ký" onPress={handleRegisterClick} />
      </View>
      {registrationSuccess && (
        <Text style={styles.registrationSuccessText}>
          Đăng ký thành công! Thông tin của bạn:
          {'\n'}
          Tên người dùng: {username}
          {'\n'}
          Email: {email}
          {'\n'}
          Mật khẩu: {password}
        </Text>
      )}
      <Text style={styles.switchText}>
        Bạn đã có tài khoản!{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Đăng Nhập
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:30,
    paddingBottom:10,
  },
  form: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
  switchText: {
    marginTop: 20,
  },
  textIn: {
    paddingBottom: 10,
    fontStyle: 'italic',
  },
  registrationSuccessText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
  },
});

export default RegisterScreen;
