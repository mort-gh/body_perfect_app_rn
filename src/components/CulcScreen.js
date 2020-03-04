import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import ButtonScreen from "./ButtonScreen";
import RNPickerSelect from "react-native-picker-select";
import CalcModalResult from "./CalcModalResult";
import { userData } from "../redux/act";
import axios from "axios";

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
  dailyRate: ""
};

class CulcScreen extends Component {
  state = { ...initialState };

  componentDidMount = async () => {
    if (this.props.token) {
      const data = await axios.get("https://slim-moms.goit.co.ua/api/v1/user", {
        headers: {
          Authorization: this.props.token,
          "Content-Type": "application/json"
        }
      });
      if (data.data.user.userData) {
        this.setState({ ...data.data.user.userData });
      }
    }
  };

  // getuserinfo=async()=>{
  //   const data= await axios.get('https://slim-moms.goit.co.ua/api/v1/user' ,{
  //     headers: {
  //       Authorization: this.props.token,
  //       "Content-Type": "application/json"
  //     }
  // })
  //    console.log(data)

  // }
  handleSubmit = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible
    }));

    // const calculated =
    // (10 * this.state.currentWeight + 6,
    // 25 * this.state.height -
    //   5 * this.state.age -
    //   161 -
    //   10 * (this.state.currentWeight - this.state.desiredWeight));

    // this.setState({
    //   dailyRate: calculated
    // });

    this.props.userData(this.state);
  };

  handleChange = (name, value) => {
    // if (Number(this.state.height) < 1 || Number(this.state.height) > 4) {
    //   alert('Height might contain 3 symbols!')
    //   return;
    // }
    // else if (Number(this.state.age) < 0 || Number(this.state.age) > 99) {
    //   alert('Age is not correct!')
    //   return;
    // }
    // else if (Number(this.state.currentWeight) < Number(this.state.desiredWeight))
    // {
    //   alert("desired weight cannot be greater than current weight! ");
    //   return;
    // }
    this.setState({ [name]: Number(value) });
  };
  render() {
    console.log("CALC SCREEN.props", this.props);

    const {
      height,
      age,
      currentWeight,
      desiredWeight,
      groupBlood,
      isModalVisible
    } = this.state;

    return (
      <>
        {this.props.isAuth && (
          <>
            {/* <ButtonScreen /> */}

            <ScrollView>
              <Text style={styleText}>
                Пересчитай свою суточную норму калорий прямо сейчас
              </Text>

              <TextInput
                keyboardType="number-pad"
                placeholder="Рост *"
                minLength={1}
                maxLength={3}
                id="height"
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                label={"Height *"}
                onChangeText={text => this.handleChange("height", text)}
                value={height}
              />
              <TextInput
                placeholder="Возраст *"
                keyboardType="number-pad"
                minLength={2}
                maxLength={2}
                id="age"
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                label={"Age *"}
                onChangeText={text => this.handleChange("age", text)}
                value={age}
              />
              <TextInput
                placeholder="Текущий вес *"
                keyboardType="number-pad"
                minLength={2}
                maxLength={3}
                id="currentWeight"
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                label={"Current Weight *"}
                onChangeText={text => this.handleChange("currentWeight", text)}
                value={currentWeight}
              />
              <TextInput
                placeholder="Желаемый вес *"
                keyboardType="number-pad"
                minLength={2}
                maxLength={3}
                id="desiredWeight"
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                label={"Target Weight *"}
                onChangeText={text => this.handleChange("desiredWeight", text)}
                value={desiredWeight}
              />

              <RNPickerSelect
                // value={groupBlood}
                onValueChange={text => this.handleChange("groupBlood", text)}
                placeholder="Группа крови *"
                items={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" }
                ]}
              />

              <TouchableOpacity onPress={this.handleSubmit}>
                <Text>Похудеть</Text>
              </TouchableOpacity>
              {isModalVisible && (
                <CalcModalResult
                  JumpTo={this.props.route}
                  dailyRate={this.state.dailyRate}
                />
              )}
            </ScrollView>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  token: state.auth.token
});

export default connect(mapStateToProps, { userData })(CulcScreen);
