import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  bottomPadding: {
    paddingBottom: 130,
  }
});

export const ClockValueStyle = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    marginRight: 10,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 300
  },
  values: {
    fontWeight: 'condensedBold',
    fontSize: 28,
    textAlign: 'center'
  },
  labels: {
    fontWeight: 400,
    fontSize: 14,
    textAlign: 'center',
    color: '#6c757d',
  },
  lapTable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center'
  },
  lapTableLabel: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
  },
  controlsBTNgrp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlsBTN: {
    borderRadius: 100,
    elevation: 4,
    backgroundColor: '#fff',
    marginRight: 20,
    minHeight: 45,
    padding: 15,
  }
});
