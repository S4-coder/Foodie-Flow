import { resArray } from "./mockData";

const defaultMenuItems = [
  {
    id: "menu-1",
    name: "Chicken Biryani",
    price: 24900,
    description: "Aromatic basmati rice cooked with flavorful spices.",
    ratings: {
      aggregatedRating: {
        rating: "4.4",
        ratingCount: "120+",
      },
    },
  },
  {
    id: "menu-2",
    name: "Paneer Tikka",
    price: 19900,
    description: "Soft paneer cubes grilled with classic tandoori masala.",
    ratings: {
      aggregatedRating: {
        rating: "4.2",
        ratingCount: "80+",
      },
    },
  },
  {
    id: "menu-3",
    name: "Cold Coffee",
    price: 9900,
    description: "Chilled coffee blended smooth and creamy.",
    ratings: {
      aggregatedRating: {
        rating: "4.1",
        ratingCount: "40+",
      },
    },
  },
];

export const createFallbackMenu = (resId) => {
  const restaurant = resArray.find((item) => item.id === resId) ?? resArray[0];

  return [
    {
      card: {
        card: {
          info: {
            id: restaurant.id,
            name: restaurant.resName,
            avgRatingString: String(restaurant.avgRating),
            totalRatingsString: "100+ ratings",
            costForTwoMessage: restaurant.costForTwo,
            cuisines: restaurant.cuisine,
          },
        },
      },
    },
    {
      groupedCard: {
        cardGroupMap: {
          REGULAR: {
            cards: [
              {
                card: {
                  card: {
                    itemCards: defaultMenuItems.map((item, index) => ({
                      card: {
                        info: {
                          ...item,
                          id: `${restaurant.id}-${index + 1}`,
                        },
                      },
                    })),
                  },
                },
              },
            ],
          },
        },
      },
    },
  ];
};
