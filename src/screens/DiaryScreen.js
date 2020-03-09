import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import Swipeable from "react-native-swipeable";
import { SwipeListView } from "react-native-swipe-list-view";
import { AppLoader } from "../components/ui/AppLoader";
import SearchAdd from "../components/diary/SearchAdd";
import CalendarAdd from "../components/diary/CalendarAdd";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function yyyymmdd() {
  function twoDigit(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var now = new Date();
  return (
    "" +
    now.getFullYear() +
    "-" +
    twoDigit(now.getMonth() + 1) +
    "-" +
    twoDigit(now.getDate())
  );
}

class DiaryScreen extends Component {
  state = {
    data: yyyymmdd(),
    calendarIsOpen: false,
    dayIngredients: [],
    dataURL: Date.now(),
    preLoader: false,
    currentlyOpenSwipeable: null
  };

  componentDidMount() {
    if (this.state.dayIngredients.length === 0) {
      this.getDayIngredients();
    }
  }

  selectedDate = async value => {
    await this.setState({
      data: value.dateString,
      dataURL: value.timestamp,
      calendarIsOpen: false
    });
    await this.getDayIngredients();
  };

  openCalendar = () => {
    this.setState({
      calendarIsOpen: true
    });
  };

  getDayIngredients = async () => {
    this.setState({
      preLoader: true
    });
    await axios
      .get(
        `https://slim-moms.goit.co.ua/api/v1/user/eats/${new Date(
          this.state.dataURL
        ).toISOString()}`,
        {
          headers: {
            Authorization: this.props.auth.token
          }
        }
      )
      .then(data =>
        this.setState({
          dayIngredients: data.data.products.reverse()
        })
      )
      .finally(() => this.setState({ preLoader: false }));

    await this.props.reload({ type: "RELOAD_PAGE" });
  };

  onRemoveItem = async id => {
    await axios.delete(`https://slim-moms.goit.co.ua/api/v1/user/eats/${id}`, {
      headers: {
        Authorization: this.props.auth.token
      }
    });

    await this.getDayIngredients();
  };

  removeAlert = id => {
    Alert.alert(
      "Подвердите удаление",
      "Вы уверены, что хотите удалить элемент из списка?",
      [
        {
          text: "Отменить"
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => this.onRemoveItem(id)
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { currentlyOpenSwipeable } = this.state;

    const rightButtons = id => [
      <TouchableHighlight
        onPress={() => this.removeAlert(id)}
        style={[
          styles.rightSwipeItem,
          {
            backgroundColor: "red",
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 10,
            marginLeft: 10
          }
        ]}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "open-regular",
            marginHorizontal: 10
          }}
        >
          Удалить
        </Text>
      </TouchableHighlight>
    ];

    return (
      <View>
        {this.state.preLoader && <AppLoader />}

        <SearchAdd
          getDayIngredients={this.getDayIngredients}
          token={this.props.auth.token}
        />

        <View style={styles.openCalendar}>
          <View style={styles.calendar}>
            <Text style={styles.calendarTitle}>Сводка за:</Text>
            <TouchableOpacity onPress={this.openCalendar}>
              <Text style={styles.calendarData}>
                {this.state.data}
                &nbsp;
                <MaterialCommunityIcons
                  name="calendar"
                  size={15}
                  color="orange"
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listWrap}>
          <View>
            {this.state.dayIngredients.length < 1 ? (
              <Text>Здесь будет отображаться Ваш рацион!</Text>
            ) : (
              <>
                <View style={styles.ingridientLiHeader}>
                  <Text style={styles.aboutTextProduct}>Продукт</Text>
                  <Text style={styles.aboutText}>Калории</Text>
                  <Text style={styles.aboutText}>Граммы</Text>
                </View>

                <ScrollView style={{ marginBottom: 305 }}>
                  <SwipeListView
                    itemDimension={200}
                    data={this.state.dayIngredients}
                    renderItem={({ item }) => (
                      <Swipeable
                        rightButtons={rightButtons(item._id)}
                        rightButtonWidth={100}
                        onRightButtonsOpenRelease={(
                          event,
                          gestureState,
                          swipeable
                        ) => {
                          if (
                            currentlyOpenSwipeable &&
                            currentlyOpenSwipeable !== swipeable
                          ) {
                            currentlyOpenSwipeable.recenter();
                          }

                          this.setState({ currentlyOpenSwipeable: swipeable });
                        }}
                        onRightButtonsCloseRelease={() =>
                          this.setState({ currentlyOpenSwipeable: null })
                        }
                      >
                        <View style={styles.ingridientLi}>
                          <View style={styles.productConteiner}>
                            <Text>{item.title.ru}</Text>
                          </View>
                          <View style={styles.calloriesContainer}>
                            <Text style={styles.calloriesText}>
                              {item.calories}
                            </Text>
                          </View>
                          <View style={styles.gramConteiner}>
                            <Text style={styles.gramText}>{item.weight}</Text>
                          </View>
                        </View>
                      </Swipeable>
                    )}
                    keyExtractor={item => item._id}
                  />
                </ScrollView>
              </>
            )}
          </View>
        </View>

        {this.state.calendarIsOpen ? (
          <CalendarAdd selectedDate={this.selectedDate} />
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = state => state;

const mDTP = dispatch => ({
  reload: () => dispatch({ type: "RELOAD_PAGE" })
});

export default connect(mapStateToProps, mDTP)(DiaryScreen);

const styles = StyleSheet.create({
  openCalendar: {
    alignItems: "center",
    paddingVertical: 20
  },
  listWrap: {
    // marginTop: 50
  },
  item: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#32a852",
    borderWidth: 1,
    margin: 2
  },
  button: {
    backgroundColor: "#f16d6b",
    alignItems: "center",
    justifyContent: "center",
    width: 15,
    height: 15,
    borderRadius: 100,
    marginLeft: 10
  },
  calendar: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 200
  },
  calendarTitle: {
    fontFamily: "open-regular",
    fontSize: 16,
    color: "#444"
  },
  calendarData: {
    paddingLeft: 5,
    fontFamily: "open-bold",
    fontSize: 16,
    color: "#444"
  },
  horizontLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  btnDeleteIngridiend: {
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 100
  },
  ingridientLi: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  },
  ingridientLiHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey",
    borderTopWidth: 0.5,
    borderTopColor: "lightgrey",
    backgroundColor: "orange"
  },
  aboutText: {
    fontFamily: "open-bold",
    width: "25%",
    textAlign: "center",
    color: "white"
  },
  aboutTextProduct: {
    fontFamily: "open-bold",
    width: "50%",
    textAlign: "center",
    color: "white"
  },
  productConteiner: {
    width: "50%",
    paddingLeft: 10,
    paddingRight: 10
  },
  gramConteiner: {
    width: "25%",
    alignContent: "center",
    textAlign: "center"
  },
  gramText: {
    textAlign: "center",
    fontFamily: "open-bold"
  },
  calloriesContainer: {
    width: "25%",
    textAlign: "center",
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 20
  },
  calloriesText: {
    textAlign: "center",
    fontFamily: "open-bold",
    color: "white"
  }
});
