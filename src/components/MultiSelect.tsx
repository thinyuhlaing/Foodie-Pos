import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import { SetStateAction } from "react";

interface Props {
  title: string;
  selected: number[];
  setSelected: (value: SetStateAction<number[]>) => void;
  items: MenuCategory[] | Menu[];
}

export default function MultiSelect({
  title,
  selected,
  setSelected,
  items,
}: Props) {
  return (
    <FormControl className="w-full">
      <InputLabel>{title}</InputLabel>
      <Select
        multiple
        value={selected} // []
        input={<OutlinedInput label="Menu Category" />}
        onChange={(evt) => {
          const selectedValue = evt.target.value as number[];
          setSelected(selectedValue);
        }} // if onChange add new
        renderValue={() => {
          return selected
            .map((selectedId) => items.find((item) => item.id === selectedId))
            .map((item: any) => item.name)
            .join(", ");
        }} // to show
      >
        {items.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {/*value*/}
              <Checkbox checked={selected.includes(item.id)} />
              {/*  like item.id ===  */}
              <ListItemText primary={item.name} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
/*
(1) OnChange 
(2) value
(3) Checkbox
*/
