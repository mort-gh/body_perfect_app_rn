import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Alert
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { userData } from "../../redux/act";
import { styles } from "./initialInfo.styles";
import { Ionicons } from "@expo/vector-icons";

const initialState = {
  height: "",
  age: "",
  currentWeight: "",
  desiredWeight: "",
  groupBlood: "",
  dailyRate: "",
  productsByBloodType: [],
  errorInForm: false,
  token: ""
};

class InitialInfo extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  state = {
    ...initialState,
    isModalVisible: false
  };

  componentDidMount = () => {
    this.handleAnimation();
  };

  handleAnimation = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    }).start();
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
            await this.props.userData(this.state);
            await this.props.navigation.navigate("Результат");
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
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value === "" ? "" : Number(value) });
  };
  handleChangeSelect = value => {
    this.setState({ groupBlood: value });
  };

  render() {
    const {
      height,
      age,
      currentWeight,
      desiredWeight,
      groupBlood,
      errorInForm
    } = this.state;

    return (
      <>
        {errorInForm &&
          Alert.alert(
            "Некорректные данные",
            "Проверьте корректность веденных данных",
            [
              {
                text: "ладно :( ",
                style: "destructive"
              }
            ],
            { cancelable: false }
          )}

        <ScrollView style={styles.warp}>
          <Text style={styles.title}>
            Узнай свою суточную норму калорий прямо сейчас
          </Text>
          <View style={styles.inputBlock}>
            <TextInput
              keyboardType="number-pad"
              placeholder="Рост (см) *"
              minLength={1}
              maxLength={3}
              returnKeyType="done"
              id="height"
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
              returnKeyType="done"
              id="age"
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
              returnKeyType="done"
              id="currentWeight"
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
              returnKeyType="done"
              id="desiredWeight"
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
                selectedValue={groupBlood}
                onValueChange={value => {
                  this.handleChangeSelect(value);
                }}
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
              <Text style={styles.buttonText}>Похудеть</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default connect(null, { userData })(InitialInfo);
