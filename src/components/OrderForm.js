import React, { useState } from 'react';
import { TextInput, View, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const products = [
  { id: 1, name: "Mũ", price: 10, category: "category1" },
  { id: 2, name: "Quần", price: 20, category: "category2" },
  { id: 3, name: "Áo", price: 30000, category: "category1" }, // Sản phẩm "áo" với giá 30
  // Thêm thông tin về các sản phẩm khác tại đây
];

const OrderForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const onNameChange = (text) => {
    setName(text);
  };

  const onAddressChange = (text) => {
    setAddress(text);
  };

  const onPhoneChange = (text) => {
    setPhone(text);
  };

  const onProductCategoryChange = (value) => {
    setProductCategory(value);
    setSelectedProduct(null);
  };

  const onProductChange = (value) => {
    const product = products.find((product) => product.id === value);
    setSelectedProduct(product);
  };

 const placeOrder = () => {
  const selectedProductName = selectedProduct ? selectedProduct.name : 'Áo';
  const selectedProductPrice = selectedProduct ? selectedProduct.price : '30.000';
  setProductName(selectedProductName);
  setProductPrice(selectedProductPrice);
  setOrderPlaced(true);
  setShowOrderSummary(true);
};


  const goBackToOrderForm = () => {
    setOrderPlaced(false);
    setShowOrderSummary(false);
    setName('');
    setAddress('');
    setPhone('');
    setProductCategory('');
    setSelectedProduct(null);
    setProductName('');
    setProductPrice('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showOrderSummary ? (
        <View style={styles.text}>
          <Text style={styles.Mess}>Đơn hàng đã đặt thành công!</Text>
          <Text>Tên: {name}</Text>
          <Text>Địa chỉ: {address}</Text>
          <Text>Số điện thoại: {phone}</Text>
          <Text>Danh mục sản phẩm: {productCategory}</Text>
          {selectedProduct && (
            <View>
              <Text>Tên sản phẩm: {selectedProduct.name}</Text>
              <Text>Giá: {selectedProduct.price}đ</Text>
            </View>
          )}
          {orderPlaced && (
            <View>
              <Text>Tên sản phẩm: {productName}</Text>
              <Text>Giá: {productPrice > 0 ? `${productPrice}đ` : 'Không rõ giá'}</Text>
            </View>
          )}
          <Button title="Quay về" onPress={goBackToOrderForm} />
        </View>
      ) : (
        <>
          <TextInput style={styles.input} placeholder="Tên" onChangeText={onNameChange} value={name} />
          <TextInput style={styles.input} placeholder="Địa chỉ" onChangeText={onAddressChange} value={address} />
          <TextInput style={styles.input} placeholder="Số điện thoại" onChangeText={onPhoneChange} value={phone} />
          <Picker
            selectedValue={productCategory}
            onValueChange={onProductCategoryChange}
            style={[styles.input, productCategory === '' && styles.errorInput]}
          >
            <Picker.Item label="Chọn danh mục" value="" />
            <Picker.Item label="Danh mục 1" value="category1" />
            <Picker.Item label="Danh mục 2" value="category2" />
            <Picker.Item label="Danh mục 3" value="category3" />
          </Picker>
          {productCategory !== '' && (
            <Picker
              selectedValue={selectedProduct?.id}
              onValueChange={onProductChange}
              style={[styles.input, !selectedProduct && styles.errorInput]}
            >
              <Picker.Item label="Chọn sản phẩm" value="" />
              {products
                .filter((product) => product.category === productCategory)
                .map((product) => (
                  <Picker.Item key={product.id} label={product.name} value={product.id} />
                ))}
            </Picker>
          )}
          <Button title="Đặt hàng" onPress={placeOrder} disabled={selectedProduct} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
 
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  Mess: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default OrderForm;
