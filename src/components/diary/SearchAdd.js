import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
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
          <FlatGrid
            items={this.state.selectedItems}
            renderItem={({ item }) => (
              <>
                <View style={SearchAddStyle.selectedItem}>
                  <View style={SearchAddStyle.sectionSelectedItemBorder}>
                    <Text style={SearchAddStyle.selectedItemText}>
                      Продукт :
                    </Text>
                    <Text>{item.label}</Text>
                  </View>
                  <View style={SearchAddStyle.sectionSelectedItemBorder}>
                    <Text style={SearchAddStyle.selectedItemText}>Грамм :</Text>
                    <TextInput
                      style={SearchAddStyle.inputGram}
                      onChange={e =>
                        this.onChangeWeight(e.nativeEvent.text, item.value)
                      }
                      placeholder="Грам"
                      value={this.state.weight}
                      returnKeyType="done"
                      keyboardType="number-pad"
                      autoFocus={true}
                      maxLength={5}
                    />
                  </View>
                  <TouchableOpacity
                    id={item.value}
                    onPress={() =>
                      setTimeout(() => {
                        this.onRemoveItem(item.value);
                      }, 0)
                    }
                    style={SearchAddStyle.btnDeleteSelect}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={15}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
            keyExtractor={item => item.value}
          />

          <View style={{ alignItems: "center" }}>
            {this.state.selectedItems.length > 0 && (
              <TouchableOpacity
                style={SearchAddStyle.btnAdd}
                onPress={this.addIngredientsToDATA}
              >
                <MaterialCommunityIcons name="plus" size={31} color="white" />
              </TouchableOpacity>
            )}
          </View>
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
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between"
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
    paddingLeft: 30,
    paddingRight: 4,
    width: 100,
    height: 30,
    fontSize: 17
  },
  sectionSelectedItem: {
    display: "flex",
    alignSelf: "stretch",
    justifyContent: "space-between"
  },
  sectionSelectedItemBorder: {
    width: 150,
    flexDirection: "column",
    alignItems: "center"
  },
  selectedItemText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 4
  }
});
