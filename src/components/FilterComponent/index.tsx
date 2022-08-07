import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const FilterComponent = ({filterDay,filterText,selectedRange,setSelectedRange}:{setSelectedRange:(rangeValue: string) => void,selectedRange:string,filterDay:number,filterText:string}) => {
    const isFilterSelected=(filter)=>filter==selectedRange;
    return (
    <Pressable onPress={()=>setSelectedRange(filterDay.toString())} style={{paddingHorizontal:10,paddingVertical:5,backgroundColor:'#1e1e1e',borderRadius:5}}>
      <Text style={{ color: isFilterSelected(filterDay)?'white':'grey' }}>{filterText}</Text>
    </Pressable>
  );
};

export default FilterComponent;
