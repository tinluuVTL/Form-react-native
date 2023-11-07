import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const EventForm = ({ onRegister, onBack }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleRegister = () => {
    const newEvent = {
      eventTitle: eventTitle,
      eventDate: eventDate,
      eventLocation: eventLocation,
      eventDescription: eventDescription,
    };
    onRegister(newEvent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tiêu đề sự kiện"
          value={eventTitle}
          onChangeText={text => setEventTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ngày diễn ra"
          value={eventDate}
          onChangeText={text => setEventDate(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa điểm"
          value={eventLocation}
          onChangeText={text => setEventLocation(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mô tả"
          value={eventDescription}
          onChangeText={text => setEventDescription(text)}
        />
        <Button title="Đăng ký" onPress={handleRegister} />
        
      </View>
    </View>
  );
};

const DisplayDataScreen = ({ eventList, onDelete, onBack }) => {
  const [tableData, setTableData] = useState([]);
  const tableHead = ['Tiêu đề', 'Ngày diễn ra', 'Địa điểm', 'Mô tả'];

  const updateTableData = (events) => {
    const eventTableData = events.map((event) => [
      event.eventTitle,
      event.eventDate,
      event.eventLocation,
      event.eventDescription,
    ]);
    setTableData(eventTableData);
  };

  useEffect(() => {
    updateTableData(eventList);
  }, [eventList]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.eventList}>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </ScrollView>
      <Button title="Quay lại" onPress={onBack} />
      {eventList.map((event, index) => (
        <View key={index} style={styles.eventItem}>
          <Text style={styles.eventInfo}>Tiêu đề: {event.eventTitle}</Text>
          <Text style={styles.eventInfo}>Ngày diễn ra: {event.eventDate}</Text>
          <Text style={styles.eventInfo}>Địa điểm: {event.eventLocation}</Text>
          <Text style={styles.eventInfo}>Mô tả: {event.eventDescription}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(index)}
          >
            <Text style={styles.deleteButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const App = () => {
  const [eventList, setEventList] = useState([]);
  const [displayRegister, setDisplayRegister] = useState(true);

  const handleRegister = (newEvent) => {
    setEventList([...eventList, newEvent]);
    setDisplayRegister(false);
  };

  const handleBack = () => {
    setDisplayRegister(true);
  };

  const handleDelete = (index) => {
    const updatedEventList = [...eventList];
    updatedEventList.splice(index, 1);
    setEventList(updatedEventList);
  };

  return (
    <View style={styles.container}>
      {displayRegister ? (
        <EventForm onRegister={handleRegister} onBack={handleBack} />
      ) : (
        <DisplayDataScreen
          eventList={eventList}
          onDelete={handleDelete}
          onBack={handleBack}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  eventList: {
    marginTop: 20,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  eventItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  eventInfo: {
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 5,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    width: 60,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default App;
