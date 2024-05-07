import AddonCategories from "@/components/AddonCategories";
import QuantitySelector from "@/components/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appDataSelector } from "@/store/slices/appSlice";
import { Box, Button, Chip, Typography } from "@mui/material";
import { Addon } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { nanoid } from "nanoid";
import { CartItem } from "@/types/cart";
import { addToCart } from "@/store/slices/cartSlice";
import defaultImage from "../../../../img/FoodiePos.jpg";
export default function OrderAppDetail() {
  const { query, isReady, ...router } = useRouter();
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const menuId = Number(query.id); // 1 --> /order/menu/1
  const { menus, addonCategories, menuAddonCategories } = useAppSelector(
    appDataSelector,
    shallowEqual
  );

  const menu = menus.find((item) => item.id === menuId);
  const addonCategoryIds = menuAddonCategories
    .filter((item) => item.menuId === menuId)
    .map((item) => item.addonCategoryId);

  const validAddonCategories = addonCategories.filter((item) =>
    addonCategoryIds.includes(item.id)
  );

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };
  const handleAddToCart = () => {
    if (!menu) return;
    const newCartItem: CartItem = {
      id: nanoid(7),
      menu,
      addons: selectedAddons,
      quantity,
    };
    console.log(newCartItem);
    dispatch(addToCart(newCartItem));
    const pathname = "/order";
    router.push({ pathname, query });
  };
  useEffect(() => {
    const requiredAddonCategories = validAddonCategories.filter(
      (item) => item.isRequired
    );
    const selectedRequiredAddons = selectedAddons.filter((selectedAddon) => {
      const addonCategory = validAddonCategories.find(
        (item) => item.id === selectedAddon.addonCategoryId
      );
      console.log("addonCategory", addonCategory);
      return addonCategory?.isRequired ? true : false;
    });
    const isDisabled =
      requiredAddonCategories.length !== selectedRequiredAddons.length;
    setIsDisabled(isDisabled);
    console.log("requiredAddonCategories", requiredAddonCategories);
    console.log("selectedRequiredAddons", selectedRequiredAddons);
  }, [selectedAddons, addonCategories]);
  if (!menu) return;
  return (
    <Box>
      {/* w-[70rem] p-4 rounded-2xl flex flex-col relative bottom-28 bg-pink-300 */}

      <Box className=" w-[40rem] flex justify-between items-center flex-col mx-auto  mt-28 p-3  ">
        <AddonCategories
          addonCategories={validAddonCategories}
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
        />
        <QuantitySelector
          value={quantity}
          onDecrease={handleQuantityDecrease}
          onIncrease={handleQuantityIncrease}
        />
        <Box className="mt-3">
          <Button
            disabled={isDisabled}
            variant="outlined"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// import AddonCategories from "@/components/AddonCategories";
// import OrderAppLayout from "@/components/OrderAppLayout";
// import { useAppSelector } from "@/store/hooks";
// import { appDataSelector } from "@/store/slices/appSlice";
// import { Box, Button, Typography } from "@mui/material";
// import { Addon } from "@prisma/client";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { shallowEqual } from "react-redux";
// export default function OrderAppDetail() {
//   const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
//   const router = useRouter();
//   const menuId = Number(router.query.id);
//   const { menus, addonCategories, menuAddonCategories } = useAppSelector(
//     appDataSelector,
//     shallowEqual
//   );
//   const [isDisabled, setIsDisabled] = useState(true);
//   console.log("isDisabled", isDisabled);
//   const addonCategoryIds = menuAddonCategories
//     .filter((item) => item.menuId === menuId)
//     .map((item) => item.addonCategoryId);

//   const validAddonCategories = addonCategories.filter((item) =>
//     addonCategoryIds.includes(item.id)
//   );
//   const menu = menus.find((menu) => menu.id === menuId);
//   useEffect(() => {
//     const isRequiredAddonCategories = validAddonCategories.filter(
//       (item) => item.isRequired
//     );
//     const selectedRequiredAddons = selectedAddons.filter((selectedAddon) => {
//       const addonCategoryId = selectedAddon.addonCategoryId;
//       const addonCategory = addonCategories.find(
//         (addonCategory) => addonCategory.id === addonCategoryId
//       );
//       return addonCategory?.isRequired ? true : false;
//     });
//     const isDisabled =
//       isRequiredAddonCategories.length !== selectedRequiredAddons.length;
//     setIsDisabled(isDisabled);
//   }, [selectedAddons]);
//   if (!menu) return null;
//   return (
//     <OrderAppLayout>
//       <Typography>{menu.name}</Typography>
//       <AddonCategories
//         addonCategories={validAddonCategories}
//         selectedAddons={selectedAddons}
//         setSelectedAddons={setSelectedAddons}
//       />
//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <Button disabled={isDisabled} variant="outlined">
//           Add to cart
//         </Button>
//       </Box>
//     </OrderAppLayout>
//   );
// }

// 2. need to explain yourself about work which addon category button ?

// http://localhost:3000/order?tableId=8
// http://localhost:3000/order/menu/1?tableId=8
// http://localhost:3000/order/cart?tableId=8
