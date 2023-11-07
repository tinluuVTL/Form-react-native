import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Picker } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const Product = () => {
  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [productData, setProductData] = useState(null);

  const onSubmit = (data) => {
    setSuccessMessage('Đăng ký thành công');
    setProductData(data);
    reset();
  };

  return (
    <View style={styles.container}>
      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : null}

      <Controller
        control={control}
        rules={{
          required: 'Tên sản phẩm là bắt buộc.',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors?.productName && styles.errorInput,
            ]}
            placeholder="Tên sản phẩm"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="productName"
        defaultValue=""
      />
      {errors?.productName && (
        <Text style={styles.error}>{errors.productName.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: 'Giá sản phẩm là bắt buộc.',
          validate: {
            isNumber: value => !isNaN(parseFloat(value)) || 'Giá sản phẩm phải là một số.',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors?.productPrice && styles.errorInput,
            ]}
            placeholder="Giá sản phẩm"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            onFocus={() => {
              if (errors?.productPrice) {
                setError('productPrice', {
                  type: 'manual',
                  message: '',
                });
              }
            }}
          />
        )}
        name="productPrice"
        defaultValue=""
      />
      {errors?.productPrice && (
        <Text style={styles.error}>{errors.productPrice.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors?.productDescription && styles.errorInput,
            ]}
            placeholder="Mô tả sản phẩm"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="productDescription"
        defaultValue=""
      />

      <Controller
        control={control}
        rules={{ required: 'Danh mục sản phẩm là bắt buộc.' }}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={[
              styles.input,
              errors?.productCategory && styles.errorInput,
            ]}
          >
            <Picker.Item label="Chọn danh mục" value="" />
            <Picker.Item label="Danh mục 1" value="category1" />
            <Picker.Item label="Danh mục 2" value="category2" />
            <Picker.Item label="Danh mục 3" value="category3" />
          </Picker>
        )}
        name="productCategory"
        defaultValue=""
      />
      {errors?.productCategory && (
        <Text style={styles.error}>{errors.productCategory.message}</Text>
      )}

      <Button title="Đăng ký" onPress={handleSubmit(onSubmit)} />

      {productData && (
        <View style={styles.productDataContainer}>
          <Text style={styles.productDataTitle}>Thông tin sản phẩm đã đăng ký:</Text>
          <Text>Tên sản phẩm: {productData.productName}</Text>
          <Text>Giá sản phẩm: {productData.productPrice}</Text>
          <Text>Mô tả sản phẩm: {productData.productDescription}</Text>
          <Text>Danh mục sản phẩm: {productData.productCategory}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
  productDataContainer: {
    marginTop: 20,
  },
  productDataTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Product;