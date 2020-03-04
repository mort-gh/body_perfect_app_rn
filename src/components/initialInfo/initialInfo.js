import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Sae } from "react-native-textinput-effects";
import {
  ScrollView,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Form
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CalcModalResult from "../CalcModalResult";
import { postInfo } from "../../operations/authorizationOperations";
import { userData } from "../../redux/act";

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

class InitialInfo extends Component {
  state = {
    ...initialState,
    isModalVisible: false
  };

  handleSubmit = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible
    }));

    const calculated =
      (10 * this.state.currentWeight + 6,
      25 * this.state.height -
        5 * this.state.age -
        161 -
        10 * (this.state.currentWeight - this.state.desiredWeight));

    this.setState({
      dailyRate: calculated
    });

    this.props.userData(this.state);

    // console.log(Number(this.state.height))
    // if (Number(this.state.height) < 1 || Number(this.state.height) > 4) {

    //   return;
    // }

    // } else if (Number(this.state.age) < 0 && Number(this.state.age) > 99) {
    //   return;
    // } else if (
    //   Number(this.state.currentWeight) < Number(this.state.desiredWeight)
    // ) {
    //   console.log("desired weight cannot be greater than current weight! ");
    //   return;
    // }

    // this.props.data(this.state);

    // this.setState({
    //   state: { ...initialState }
    // });
  };

  // toggleModal=()=>{
  //   this.setState((prevState)=>({
  //     isModalVisible: !prevState.isModalVisible
  //   }))
  // }

  handleChange = (name, value) => {
    // if (Number(this.state.height) < 1 && Number(this.state.height) > 4) {
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
    // else{
    this.setState({ [name]: Number(value) });
  };
  // };

  render() {
    console.log(" INITIOAL this.props", this.props);
    const {
      height,
      age,
      currentWeight,
      desiredWeight,
      groupBlood,
      isModalVisible
    } = this.state;
    return (
      <ScrollView>
        <Text style={styleText}>
          Узнай свою суточную норму калорий прямо сейчас
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
        {/* <TextInput
          id="bloodType"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          label={"Blood Type *"}
          onChangeText={text => this.handleChange("bloodType", text)}
          value={bloodType}
        /> */}

        <RNPickerSelect
          // value={groupBlood}
          onValueChange={text => this.handleChange("groupBlood", text)}
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
            JumpTo={this.props.navigation}
            dailyRate={this.state.dailyRate}
          />
        )}

        {/* <Sae
        style={styleInput}
        label={"Height"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      />
      <Sae
        style={styleInput}
        label={"Age"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      />
      <Sae
        style={styleInput}
        label={"Current Weight"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      />
      <Sae
        style={styleInput}
        label={"Target Weight"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      />
      <Sae
        placeholder="dfsdfs"
        style={styleInput}
        label={"Blood Type"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      /> */}
      </ScrollView>
    );
  }
}

export default connect(null, { userData })(InitialInfo);
