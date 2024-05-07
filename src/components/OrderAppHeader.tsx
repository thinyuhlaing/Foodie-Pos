import { useAppSelector } from "@/store/hooks";
import Home from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import defaultImage from "../img/FoodiePos.jpg";

const OrderAppHeader = () => {
  const { isLoading } = useAppSelector((state) => state.app);
  const { menus } = useAppSelector((state) => state.menu);

  const router = useRouter();
  const isHome = router.pathname === "/order";
  const isCart = router.pathname === "/order/cart";
  const isMenu = router.pathname === "/order/menu/[id]";

  const isActiveOrder = router.pathname.includes("/order/active-order");
  const isCartOrActiveOrderPage = isCart || isActiveOrder;
  const company = useAppSelector((state) => state.company.company);
  const cartItems = useAppSelector((state) => state.cart.items);
  const showCompanyInfo = isHome && company;
  const menuId = router.query.id;
  const menu = menus.find((item) => item.id === Number(menuId));
  const showCartInfo = isCart;
  const showMenuInfo = isMenu;

  console.log("showCartInfo", showCartInfo);
  console.log("showMenuInfo", showMenuInfo);

  console.log("showCompanyInfo", showCompanyInfo);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          bgcolor: "#1B9C85",
          height: 60,
          px: 2,
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          {company?.name}
        </Typography>
        <Box sx={{ position: "relative" }}>
          {isCartOrActiveOrderPage ? (
            <Home
              onClick={() =>
                router.push({
                  pathname: "/order",
                  query: { tableId: router.query.tableId },
                })
              }
              sx={{
                fontSize: "40px",
                color: "#FFE194",
              }}
            />
          ) : (
            <>
              <ShoppingCartCheckoutIcon
                onClick={() =>
                  router.push({ pathname: "/order/cart", query: router.query })
                }
                sx={{
                  fontSize: "40px",
                  color: "#FFE194",
                }}
              />
              {cartItems.length > 0 && (
                <Typography
                  sx={{
                    textAlign: "right",
                    color: "#E8F6EF",
                    position: "absolute",
                    top: -10,
                    right: -10,
                  }}
                >
                  {cartItems.length}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100vw",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 15,
            right: { xs: 40, md: 80, lg: 200 },
            cursor: "pointer",
          }}
        >
          {isCartOrActiveOrderPage ? (
            <Home
              onClick={() =>
                router.push({
                  pathname: "/order",
                  query: { tableId: router.query.tableId },
                })
              }
              sx={{
                fontSize: "40px",
                color: "#FFE194",
              }}
            />
          ) : (
            <>
              <ShoppingCartCheckoutIcon
                onClick={() =>
                  router.push({ pathname: "/order/cart", query: router.query })
                }
                sx={{
                  fontSize: "40px",
                  color: "#FFE194",
                }}
              />
              {cartItems.length > 0 && (
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "right",
                    color: "#E8F6EF",
                    position: "absolute",
                    top: -10,
                    right: -10,
                  }}
                >
                  {cartItems.length}
                </Typography>
              )}
            </>
          )}
        </Box>

        <Image
          src="/order-app-header.svg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="header-image"
        />

        {showCompanyInfo && (
          <Box sx={{ position: "absolute" }} className="">
            <Box sx={{ textAlign: "center" }}>
              <Typography
                // sx={{
                //   fontWeight: "bold",

                //   mt: { xs: 1, md: 2, lg: 4, xl: 10 },
                //   fontSize: { sm: 25, md: 30, lg: 40 },
                // }}
                className="mt-24 font-semibold text-4xl mb-3"
              >
                {company?.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  lineHeight: 1.2,

                  opacity: 0.7,
                }}
              >
                {company?.street}
                <br /> {company?.township}, {company?.city}
              </Typography>
            </Box>
          </Box>
        )}
        {showCartInfo && (
          <Box sx={{ position: "absolute" }} className="">
            <Box sx={{ textAlign: "center" }}>
              <Typography
                // sx={{
                //   fontWeight: "bold",

                //   mt: { xs: 1, md: 2, lg: 4, xl: 10 },
                //   fontSize: { sm: 25, md: 30, lg: 40 },
                // }}
                className="mt-24 font-semibold text-4xl mb-3"
              >
                Review your order
              </Typography>
            </Box>
          </Box>
        )}
        {showMenuInfo && (
          <Box sx={{ position: "absolute" }} className="">
            <Box sx={{ textAlign: "center" }}>
              <Box className=" mt-20 font-semibold text-4xl  ">
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={menu?.assetUrl || defaultImage.src}
                    className="w-50  h-44 rounded-2xl mx-auto mb-7"
                  ></img>
                  <Typography variant="h4">{menu?.name}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderAppHeader;
{
  /* <Box className=" mt-24 font-semibold text-4xl mb-3">
<Box sx={{ textAlign: "center" }}>
  <img
    src={menu?.assetUrl || defaultImage.src}
    className="w-52  h-48 mb-10 rounded-2xl mx-auto"
  ></img>
</Box>
</Box> */
}
