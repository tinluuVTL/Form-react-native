// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  const navigation = useNavigation(); 
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      if (usersData) {
        const parsedUsers = JSON.parse(usersData);
        setUsers(parsedUsers);
      }
    } catch (error) {
      console.log('Error loading users', error);
    }
  };

  const saveUser = async () => {
    try {
      const newUser = {
        id: Date.now().toString(),
        username: username,
        password: password,
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsername('');
      setPassword('');
      setLoggedIn(true);
    } catch (error) {
      console.log('Error saving user', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
      await AsyncStorage.setItem('users', JSON.stringify(filteredUsers));
    } catch (error) {
      console.log('Error deleting user', error);
    }
  };

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
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
        <Text style={styles.textIn}>Nhập password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Đăng Nhập" onPress={handleLogin} />
        
      </View>
      <Text style={styles.switchText}>
        Bạn chưa có tài khoản!{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
      đăng ký
        </Text>
      </Text>
      {loggedIn && (
        <View>
          <Text style={styles.loggedInText}>Tên người dùng: {username}</Text>
          <Text style={styles.loggedInText}>Mật khẩu: {password}</Text>
        </View>
      )}
      <View style={styles.userListContainer}>
        <Text style={styles.userListTitle}>Danh sách người dùng:</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userItemContainer}>
              <Text style={styles.usernameText}>{item.username}</Text>
              <TouchableOpacity onPress={() => deleteUser(item.id)}>
                <Text style={styles.deleteButton}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <Button title="Lưu người dùng" onPress={saveUser} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:30
  },
  form: {
    width: '80%',
    padding: 20,
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
 
  textIn: {
    paddingBottom: 10,
    fontStyle: 'italic',
  },
  loggedInText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userListContainer: {
    marginTop: 20,
    width: '80%',
  },
  userListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  usernameText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
   switchText: {
    marginTop: 20,
  },
});

export default LoginScreen;
