import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";

import SearchableDropdown from "react-native-searchable-dropdown";
import axios from "axios";
import { FlatGrid } from "react-native-super-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
          Authorization: this.props.token
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
      weight: Number(value)
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
            Authorization: this.props.token
          }
        }
      )
      .then(this.setState({ selectedItems: [], weight: 100, inputValue: "" }));
    await this.props.getDayIngredients();
  };

  render() {
    return (
      <>
        <Fragment>
          <View style={SearchAddStyle.searchBlock}>
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
              itemStyle={SearchAddStyle.searchIteamAdd}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={this.state.searchArr}
              defaultIndex={2}
              resetValue={false}
              textInputProps={{
                placeholder: "Добавьте продукт",
                underlineColorAndroid: "transparent",
                style: SearchAddStyle.inputSearchIngrid,
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
          </View>
        </Fragment>

        <View style={SearchAddStyle.sectionSelectedItem}>
          <FlatList
            data={this.state.selectedItems}
            renderItem={({ item }) => (
              <View style={SearchAddStyle.selectedItem}>
                <View style={SearchAddStyle.sectionSelectedItemProduct}>
                  {/* <Text style={SearchAddStyle.selectedItemText}>Продукт</Text> */}
                  <View style={SearchAddStyle.productTextBlock}>
                    <Text style={SearchAddStyle.productText}>{item.label}</Text>
                  </View>
                </View>
                <View style={SearchAddStyle.sectionSelectedItemGramm}>
                  {/* <Text style={SearchAddStyle.selectedItemTextGram}>
                    Граммы
                  </Text> */}
                  <View style={SearchAddStyle.productTextBlock}>
                    <TextInput
                      style={SearchAddStyle.inputGram}
                      onChange={e =>
                        this.onChangeWeight(e.nativeEvent.text, item.value)
                      }
                      placeholder="Грамм"
                      value={this.state.weight}
                      returnKeyType="done"
                      keyboardType="number-pad"
                      autoFocus={true}
                      maxLength={5}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  id={item.value}
                  style={SearchAddStyle.buttonCancel}
                  onPress={() =>
                    setTimeout(() => {
                      this.onRemoveItem(item.value);
                    }, 0)
                  }
                >
                  {/* <MaterialCommunityIcons
                    name="delete"
                    size={15}
                    color="white"
                  /> */}
                  <Text style={SearchAddStyle.buttonTextCancel}>Отменить</Text>
                </TouchableOpacity>

                <View style={{ alignItems: "center" }}>
                  {this.state.selectedItems.length > 0 && (
                    <TouchableOpacity
                      onPress={this.addIngredientsToDATA}
                      style={SearchAddStyle.button}
                    >
                      {/* <MaterialCommunityIcons
                        name="plus"
                        size={31}
                        color="white"
                      /> */}
                      <Text style={SearchAddStyle.buttonText}>Добавить</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            keyExtractor={item => item.value}
          />

          {/* <View style={{ alignItems: "center" }}>
            {this.state.selectedItems.length > 0 && (
              <TouchableOpacity
                style={SearchAddStyle.btnAdd}
                onPress={this.addIngredientsToDATA}
              >
                <MaterialCommunityIcons name="plus" size={31} color="white" />
              </TouchableOpacity>
            )}
          </View> */}
        </View>
      </>
    );
  }
}

export default SearchAdd;

const SearchAddStyle = StyleSheet.create({
  btnAdd: {
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "orange",
    margin: 0,
    padding: 0
  },
  searchBlock: {},
  inputSearchIngrid: {
    marginTop: 30,
    borderColor: "orange",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "orange",
    backgroundColor: "white"
  },
  searchIteamAdd: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5
  },
  selectedItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    margin: 10,
    backgroundColor: "white"
  },
  btnDeleteSelect: {
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 100,
    marginLeft: 10,
    marginTop: 20
  },
  inputGram: {
    textAlign: "center",
    width: 100,
    height: 50,
    borderRadius: 20,
    borderColor: "orange",
    borderWidth: 2
  },
  sectionSelectedItem: {
    display: "flex",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 20
  },
  sectionSelectedItemProduct: {
    width: "70%"
  },
  sectionSelectedItemGramm: {
    width: "30%"
  },
  selectedItemText: {
    fontFamily: "open-bold",
    textAlign: "left",
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#444"
  },
  selectedItemTextGram: {
    textAlign: "center",
    paddingVertical: 10,
    fontFamily: "open-bold",
    color: "#444"
  },
  productText: {
    paddingHorizontal: 10
  },
  productTextBlock: {
    justifyContent: "center",
    height: 90
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 20
  },
  buttonCancel: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 20,
    borderColor: "orange",
    borderWidth: 1
  },
  buttonText: {
    color: "white",
    fontFamily: "open-bold"
  },
  buttonTextCancel: {
    color: "orange",
    fontFamily: "open-bold"
  }
});
