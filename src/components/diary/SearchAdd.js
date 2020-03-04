import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import axios from "axios";
import { FlatGrid } from "react-native-super-grid";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTVhNWEyZmY0ZTlhNjQxNjE3MjkwNmUiLCJjcmVhdGVkRGF0ZSI6MTU4Mjk3OTYzMTY1NSwiZXhwIjoxNTg1NTcxNjMxfQ.0Hb3XHcCsAXwtYI0ifUGN2nkjfZffsOhIOzF7RKDSEU";

class SearchAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchArr: [],
      selectedItems: [],
      inputValue: "",
      dayIngredients: [],
      weight: "100"
    };
  }

  searchIteam(value) {
    axios
      .get(`https://slim-moms.goit.co.ua/api/v1/products?search=${value}`, {
        headers: {
          Authorization: token
        }
      })
      .then(data =>
        this.setState({
          searchArr: data.data.productsOptions
        })
      );
  }
  onRemoveItem(id) {
    this.setState({
      selectedItems: [
        ...this.state.selectedItems.filter(elem => elem.value !== id)
      ]
    });
  }
  onChangeWeight = value => {
    this.setState({
      weight: value
    });
  };

  addIngredientsToDATA = async () => {
    const product = {
      ...this.state.selectedItems[0],
      weight: this.state.weight,
      date: Date.now()
    };

    await axios
      .post(
        `https://slim-moms.goit.co.ua/api/v1/user/eats/${this.state.selectedItems[0].value}`,
        product,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(this.setState({ selectedItems: [], weight: 100 }));
    await this.props.getDayIngredients();
  };

  render() {
    return (
      <>
        <Fragment>
          <SearchableDropdown
            onItemSelect={item => {
              this.setState({ selectedItems: [item] });
            }}
            containerStyle={{ padding: 5 }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedItems.filter(
                sitem => sitem.id !== item.id
              );
              this.setState({ selectedItems: items });
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: "#ddd",
              borderColor: "#bbb",
              borderWidth: 1,
              borderRadius: 5
            }}
            itemTextStyle={{ color: "#222" }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={this.state.searchArr}
            defaultIndex={2}
            resetValue={false}
            textInputProps={{
              placeholder: "placeholder",
              underlineColorAndroid: "transparent",
              style: {
                padding: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5
              },
              onTextChange: text => {
                this.searchIteam(text);
                this.setState({
                  inputValue: text
                });
              }
            }}
            listProps={{
              nestedScrollEnabled: true
            }}
          />
        </Fragment>
        <View style={{ paddingTop: 60 }}>
          <View>
            <FlatGrid
              items={this.state.selectedItems}
              renderItem={({ item }) => (
                <>
                  <View
                    style={{
                      alignSelf: "stretch",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "space-between",
                      borderColor: "#32a852",
                      borderWidth: 1,
                      margin: 2
                    }}
                  >
                    <Text>{item.label}</Text>
                    <TextInput
                      style={{
                        paddingLeft: 4,
                        paddingRight: 4,
                        width: 100,
                        height: 50
                      }}
                      onChange={e =>
                        this.onChangeWeight(e.nativeEvent.text, item.value)
                      }
                      placeholder="Грам"
                      value={this.state.weight}
                      returnKeyType="done"
                      keyboardType="number-pad"
                      autoFocus={true}
                      keyboardAppearance={"dark"}
                      maxLength={5}
                      type="number"
                    />
                    <TouchableOpacity
                      id={item.value}
                      onPress={() =>
                        setTimeout(() => {
                          this.onRemoveItem(item.value);
                        }, 0)
                      }
                      style={{
                        backgroundColor: "#f16d6b",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 25,
                        height: 25,
                        borderRadius: 100,
                        marginLeft: 10
                      }}
                    >
                      <Text>X</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              keyExtractor={item => item.value}
            />

            <View style={{ alignItems: "center" }}>
              {this.state.selectedItems.length > 0 && (
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    width: 80,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: "orange"
                  }}
                  onPress={this.addIngredientsToDATA}
                >
                  <Text style={{ paddingTop: 16 }}>Добавить</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default SearchAdd;
