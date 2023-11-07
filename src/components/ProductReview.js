import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const ProductReview = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm 1', price: 100 },
    { id: 2, name: 'Sản phẩm 2', price: 200 },
    { id: 3, name: 'Sản phẩm 3', price: 300 },
  ]);

  const handleRatingChange = (productId, rating) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, rating };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Giá: {item.price}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập đánh giá"
        onChangeText={rating => handleRatingChange(item.id, rating)}
      />
      {item.rating && <Text style={styles.productRating}>Đánh giá: {item.rating}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productContainer: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
  },
  productRating: {
    marginTop: 5,
  },
});

export default ProductReview;