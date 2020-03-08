import React from "react";
import { View, Text, StyleSheet } from "react-native";

const dataTitles = ["Дневная норма", "Употреблено", "Осталось", "% от нормы"];

const dataValues = [
  [`${Math.round(1450)} ккал`],
  [`${Math.round(1200)} ккал`],
  [`${Math.round(1450 - 1200)} ккал`],
  [`${Math.round(100 / (1450 / 1200))} %`]
];

export const ListAdd = ({ data }) => {
  const titles = data.map(item => [item.title.ru]);

  return (
    <>
      <ListAdd data={this.state.dayIngredients} />

      <View style={styles.ingridientLiHeader}>
        <Text style={styles.aboutTextProduct}>Продукт :</Text>
        <Text style={styles.aboutText}>Калории :</Text>
        <Text style={styles.aboutText}>Граммы :</Text>
        <View style={{ width: 25 }} />
      </View>
      <FlatGrid
        itemDimension={200}
        items={this.state.dayIngredients}
        renderItem={({ item }) => (
          <View style={styles.ingridientLi}>
            <View style={styles.productConteiner}>
              <Text>{item.title.ru}</Text>
            </View>
            <View>
              <Text>{item.calories}</Text>
            </View>
            <View style={styles.gramConteiner}>
              <Text>{item.weight}</Text>
            </View>

            <TouchableOpacity
              id={item._id}
              onPress={() =>
                setTimeout(() => {
                  this.onRemoveItem(item._id);
                }, 0)
              }
              style={styles.btnDeleteIngridiend}
              keyExtractor={item => item.id}
            >
              <MaterialCommunityIcons name="delete" size={15} color="white" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item._id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  border: {
    borderWidth: 0.5,
    borderColor: "lightgrey"
  },
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9"
  },
  title: {
    flex: 1
  },
  row: {
    height: 50
  },
  textLeft: {
    textAlign: "right",
    paddingRight: 20,
    fontFamily: "open-regular"
  },
  textRight: {
    textAlign: "left",
    paddingLeft: 20,
    fontFamily: "open-regular"
  },
  headerTitle: {
    textAlign: "center",
    fontFamily: "open-regular",
    marginVertical: 30
  },
  headerDate: {
    fontFamily: "open-bold"
  }
});
