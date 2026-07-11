# The Book Nook App

A React Native (Expo) app for an independent bookstore: browse and search inventory, view book
details with reviews, manage a shopping cart, and check out — built as the Bumpa mobile engineer
assessment.

## Features

- **Home** — greeting, search bar, category shortcuts, and a featured-books carousel sorted by
  rating.
- **Products** — searchable, filterable (category), sortable (title/price/rating) book grid with
  paginated "load more" and lazy-loaded cover images.
- **Book Details** — fetches a single book with explicit loading / error / success states driven
  by `useEffect`, shows description, rating, stock, and reviews.
- **Cart** — add/remove books, adjust quantities, live subtotal/tax/total, empty-cart state.
- **Checkout** — order summary, payment method selection, mock card input, loading/success/failure
  feedback, and order history recorded to the Profile tab.
- **Profile** — mock user info, order history, settings list, logout confirmation.
- **Add-to-cart animation** — tapping "add to cart" flies a clone of the book cover from its
  on-screen position to the cart tab icon using Reanimated shared values.
- **Animated splash** — a custom JS splash screen (cart icon + "The Book Nook" text, fade/scale/
  slide sequence) shown right after the native splash hides.
- **Light/dark theme** — a single `#019444`-based palette with light and dark token sets, resolved
  automatically from the system color scheme.

## Tech stack & why

| Concern                             | Choice                                                   | Why                                                                                                                                                                                                               |
| ----------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework                           | Expo SDK 55 / Expo Router                                | Already the project's setup; file-based routing keeps tab/stack structure declarative.                                                                                                                            |
| State (cart, orders, fly-animation) | Zustand                                                  | Lightweight, no boilerplate/providers, and selector-based subscriptions keep re-renders scoped to what actually changed — a good fit for a cart that's read from many screens (tab badge, cart screen, checkout). |
| Animation                           | React Native Reanimated 4                                | Runs on the UI thread for smooth 60fps add-to-cart and splash animations; already a project dependency.                                                                                                           |
| Images                              | `expo-image`                                             | Built-in disk/memory caching and `recyclingKey` support, the modern replacement for `react-native-fast-image` in Expo apps.                                                                                       |
| Lists                               | `FlatList`                                               | Built-in virtualization/windowing satisfies the "large dataset" performance requirement without adding a new dependency.                                                                                          |
| Mock API                            | In-memory data + artificial `setTimeout` delay           | Runs standalone with no extra process (no `json-server` to start), while still exercising real loading/error states.                                                                                              |
| Testing                             | Jest (`jest-expo` preset) + React Native Testing Library | Standard Expo-recommended stack for unit/component tests.                                                                                                                                                         |

## Folder structure

Route files live under `app/` (required by Expo Router); everything else — components, hooks,
services, state, theme, types, and tests — lives under `src/`, matching the project's existing
convention.

```
app/
├── _layout.tsx              # Root stack, theme/gesture/toast providers, animated splash
├── checkout.tsx             # Modal checkout screen
└── (tabs)/
    ├── _layout.tsx          # Bottom tabs, cart badge, cart-icon position tracking
    ├── home/index.tsx
    ├── products/
    │   ├── index.tsx        # Search, filter, sort, paginated grid
    │   └── [id].tsx         # Book Details (lifecycle screen)
    ├── cart/index.tsx
    └── profile/index.tsx

src/
├── components/
│   ├── common/               # PriceTag, RatingStars, SearchBar, EmptyState, ErrorState,
│   │                         # LoadingSkeleton, AnimatedSplash
│   ├── books/                # BookCard, BookCarousel, ReviewItem, CategoryPill
│   ├── cart/                 # CartItemRow, CartSummary, EmptyCart, FlyToCartOverlay
│   ├── checkout/              # OrderSummary, PaymentMethodSelector, PlaceOrderButton
│   ├── Button.tsx, Popup.tsx, BottomSheetModal.tsx   # pre-existing shared UI
├── hooks/                    # useBooks, useBookDetails, useCheckout
├── services/                 # mockBooks, booksApi, checkoutApi
├── store/                    # cartStore, ordersStore, flyAnimationStore (Zustand)
├── theme/                    # colors, typography, ThemeProvider
├── types/                    # Book, Review, CartItem, Order, ...
├── utils/                    # computeCartTotals
├── shared-utils/             # pre-existing utilities (currency, dates, disclosure, ...)
└── tests/                    # mirrors the structure above
```

## Mock API

All requests are simulated in-memory in `src/services/` with a 500–900ms artificial delay:

- `getBooks({ page, limit, search, category, sort })` → `PaginatedResponse<Book>`
- `getBookById(id)` → `Book`, throws `ApiError` for an unknown id (drives the Book Details error
  state)
- `postCheckout(payload)` → `Order`; a card number ending in `0000` simulates a decline so the
  checkout failure path is deterministic and testable

~70 books are generated deterministically across 10 categories, each with 2–4 reviews.

## Setup

```bash
yarn install
yarn ios       # or: yarn android
yarn web       # run in the browser
```

## Testing

```bash
yarn test        # run once
yarn test:watch  # watch mode
```

Covers: price display, cart add/remove/quantity, the book-details fetch lifecycle
(loading/error/success), the mock books API (pagination/search/filter/sort), and the checkout
flow (success clears the cart and records an order; failure leaves the cart untouched).

## Other scripts

```bash
yarn lint        # eslint
yarn typecheck   # tsc --noEmit
```
