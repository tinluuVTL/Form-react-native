import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const name = 'Lưu Văn Tín';
  const lop = '20CT112';
  const mssv = '120001347';

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thông tin sinh viên</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tên:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Lớp:</Text>
        <Text style={styles.value}>{lop}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>MSSV:</Text>
        <Text style={styles.value}>{mssv}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
});

export default HomeScreen;