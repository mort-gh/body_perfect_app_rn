import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Table, TableWrapper, Rows, Col } from "react-native-table-component";

export const Statistics = ({ tableTitle, tableData }) => {
  return (
    <View>
      <Text style={styles.headerTitle}>
        Сводка за &nbsp;
        <Text style={styles.headerDate}>{new Date().toLocaleDateString()}</Text>
      </Text>

      <Table borderStyle={styles.border}>
        <TableWrapper style={styles.wrapper}>
          <Col
            data={tableTitle}
            style={styles.title}
            textStyle={styles.textLeft}
          />
          <Rows
            data={tableData}
            flexArr={[1]}
            style={styles.row}
            textStyle={styles.textRight}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  border: { borderWidth: 0.5, borderColor: "lightgrey" },
  wrapper: { flexDirection: "row", backgroundColor: "#f9f9f9" },
  title: { flex: 1 },
  row: { height: 50 },
  textLeft: {
    textAlign: "right",
    paddingRight: 20,
    fontFamily: "open-regular"
  },
  textRight: { textAlign: "left", paddingLeft: 20, fontFamily: "open-regular" },
  headerTitle: {
    textAlign: "center",
    fontFamily: "open-regular",
    marginVertical: 30
  },
  headerDate: { fontFamily: "open-bold" }
});
