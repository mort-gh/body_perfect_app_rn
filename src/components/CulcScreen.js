import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { userData } from "../redux/act";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./CulcScreen.styles";

const styleText = {
  paddingRight: "32%",
  textAlign: "left",
  marginLeft: "10%",
  paddingTop: "50%",
  fontWeight: "bold",
  fontSize: "20px",
  marginBottom: "5%"
};

const styleInput = {
  marginLeft: "10%",
  marginRight: "10%",
  border: "2px solid black",
  backgroundColor: "red",
  display: "block"
};

const initialState = {
  height: "",
  age: "",
  currentWeight: "",
  desiredWeight: "",
  groupBlood: "",
  dailyRate: "",
  productsByBloodType: []
};

class CulcScreen extends Component {
  state = { ...initialState };

  componentDidMount = async () => {
    const data = await axios.get("https://slim-moms.goit.co.ua/api/v1/user", {
      headers: {
        Authorization: this.props.token,
        "Content-Type": "application/json"
      }
    });

    if (data.data.user.userData) {
      await this.setState({ ...data.data.user.userData });
    }
  };


  handleSubmit = async () => {
    if (Number(this.state.height) > 50 && Number(this.state.height) < 230) {
      if (Number(this.state.age) > 18 && Number(this.state.age) < 99) {
        if (
          Number(this.state.currentWeight) > 30 &&
          Number(this.state.currentWeight) < 300
        ) {
          if (
            Number(this.state.desiredWeight) > 30 &&
            Number(this.state.desiredWeight) < 300
          ) {
            this.setState(prevState => ({
              // isModalVisible: !prevState.isModalVisible
            }));
            const calculated = await (10 * this.state.currentWeight + 6,
            25 * this.state.height -
              5 * this.state.age -
              161 -
              10 * (this.state.currentWeight - this.state.desiredWeight));
            if (Number(this.state.groupBlood) === 1) {
              await this.setState({
                productsByBloodType: [
                  "Овсяная, пшенная, кукурузная каши",
                  "Рожь и чечевица",
                  "Жирные молочные продукты",
                  "Все виды капусты и яблоки"
                ]
              });
            } else if (this.state.groupBlood === 2) {
              await this.setState({
                productsByBloodType: [
                  "Все виды мяса",
                  "Капуста",
                  "Жирные молочные продукты"
                ]
              });
            } else if (this.state.groupBlood === 3) {
              await this.setState({
                productsByBloodType: [
                  "Крупы (особенно пшеница, гречка)",
                  "Орехи (стоит избегать арахиса)",
                  "Выпечка",
                  "Некоторые виды мяса (говядина, индейка)"
                ]
              });
            } else if (this.state.groupBlood === 4) {
              await this.setState({
                productsByBloodType: [
                  "Некоторые крупы (гречка, кукуруза)",
                  "Фасоль",
                  "Кунжут"
                ]
              });
            }
            await this.setState({
              dailyRate: calculated
            });
            axios.put(`https://slim-moms.goit.co.ua/api/v1/user`,{...this.state},{
              headers: {
                Authorization: this.props.token,
                "Content-Type": "application/json"
              }
            }).then(data=> console.log(data))
            this.props.navigation.navigate("DiaryScreen");
          }
        }
      }
    } else {
      this.setState({
        errorInForm: true
      });
      setTimeout(() => {
        this.setState({
          errorInForm: false
        });
      }, 2000);
    }
   
  }


  handleChange = (name, value) => {
    this.setState({ [name]: value===""? "" : Number(value) });
  };
  handleChangeSelect=(value)=>{
    this.setState({groupBlood:value})
  }

  render() {
    const {
      height,
      age,
      currentWeight,
      desiredWeight,
      groupBlood,
      isModalVisible,
      productsByBloodType
    } = this.state;

    return (
      <>
        <ScrollView style={styles.warp}>
          <Text style={styles.title}>Измени свою суточную норму калорий</Text>
          <View style={styles.inputBlock}>
            <TextInput
              keyboardType="number-pad"
              placeholder="Рост (см) *"
              minLength={1}
              maxLength={3}
              id="height"
              returnKeyType="done"
              style={styles.input}
              label={"Height *"}
              onChangeText={text => this.handleChange("height", text)}
              value={height.toString()}
            />
            <TextInput
              placeholder="Возраст (лет) *"
              keyboardType="number-pad"
              minLength={2}
              maxLength={2}
              id="age"
              returnKeyType="done"
              style={styles.input}
              label={"Age *"}
              onChangeText={text => this.handleChange("age", text)}
              value={age.toString()}
            />
            <TextInput
              placeholder="Текущий вес (кг) *"
              keyboardType="number-pad"
              minLength={2}
              maxLength={3}
              id="currentWeight"
              returnKeyType="done"
              style={styles.input}
              label={"Current Weight *"}
              onChangeText={text => this.handleChange("currentWeight", text)}
              value={currentWeight.toString()}
            />
            <TextInput
              placeholder="Желаемый вес (кг) *"
              keyboardType="number-pad"
              minLength={2}
              maxLength={3}
              id="desiredWeight"
              returnKeyType="done"
              style={styles.input}
              label={"Target Weight *"}
              onChangeText={text => this.handleChange("desiredWeight", text)}
              value={desiredWeight.toString()}
            />

            <View style={styles.selectorBlock}>
              <RNPickerSelect
                placeholder={{
                  label: "Группа крови *",
                  value: null,
                  color: "grey"
                }}
                value={groupBlood}
                onValueChange={(value) =>{ this.handleChangeSelect(value)}}
                style={styles.selector}
                Icon={() => {
                  return (
                    <Ionicons
                      name="ios-arrow-dropdown"
                      size={19}
                      color="orange"
                    />
                  );
                }}
                items={[
                  { label: "1", value: 1 },
                  { label: "2", value: 2 },
                  { label: "3", value: 3 },
                  { label: "4", value: 4 }
                ]}
              />
            </View>
          </View>

          <View style={styles.buttonBlock}>
            <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  token: state.auth.token,
  state
});

export default connect(mapStateToProps, { userData })(CulcScreen);
