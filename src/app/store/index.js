import { configureStore } from "@reduxjs/toolkit";
import configurationReducer from "../features/local-config";
import { useAuthApi, reducer as AuthReducer } from "../auth/auth.service";
import {
  useCommandesApi,
  reducer as CommandeReducer,
} from "../../components/Commandes/commandes-services";

import {
  useLigneCommandesApi,
  reducer as LigneCommandeReducer,
} from "../../components/LigneCommande/ligneCommandes-services";
import {
  useLivraisonsApi,
  reducer as LivraisonReducer,
} from "../../components/Livraison/livraison-services";
import {
  useMoughataasApi,
  reducer as MoughataaReducer,
} from "../../components/Moughataas/moughataas-services";
import {
  usePaymentsApi,
  reducer as PaymentReducer,
} from "../../components/Payments/payments-services";
import {
  useProduitsApi,
  reducer as ProduitReducer,
} from "../../components/Produits/produits-services";
import {
  usepublicationsApi,
  reducer as PublicationReducer,
  
} from "../../components/Publications/publication-services";
import {
  useRolesApi,
  reducer as RolesReducer,
} from "../../components/Roles/roles-services";
import {
  useUsersApi,
  reducer as UsersReducer,
} from "../../components/Users/users-services";
import {
  useWilayasApi,
  reducer as WilayaReducer,
  
} from "../../components/Wilayas/wilayas-services";
import {
  useDashboardApi,
  reducer as DashboardReducer,
  
} from "../../components/Dashboard/dashboard-services";

export const store = configureStore({
  reducer: 
  {
    configuration: configurationReducer,
    [useAuthApi.reducerPath]: useAuthApi.reducer,
    authentifications: AuthReducer,
    [useCommandesApi.reducerPath]: useCommandesApi.reducer,
    commandes: CommandeReducer,
    [useLigneCommandesApi.reducerPath]: useLigneCommandesApi.reducer,
    lignecommandes: LigneCommandeReducer,
    [useLivraisonsApi.reducerPath]: useLivraisonsApi.reducer,
    livraisons: LivraisonReducer,
    [useMoughataasApi.reducerPath]: useMoughataasApi.reducer,
    moughataas: MoughataaReducer,
    [usePaymentsApi.reducerPath]: usePaymentsApi.reducer,
    payments: PaymentReducer,
    [useProduitsApi.reducerPath]: useProduitsApi.reducer,
    produits: ProduitReducer,
    [usepublicationsApi.reducerPath]: usepublicationsApi.reducer,
    publications: PublicationReducer,
    [useRolesApi.reducerPath]: useRolesApi.reducer,
    roles: RolesReducer,
    [useUsersApi.reducerPath]: useUsersApi.reducer,
    users: UsersReducer,
    [useWilayasApi.reducerPath]: useWilayasApi.reducer,
    wilayas: WilayaReducer,
    [useDashboardApi.reducerPath]: useDashboardApi.reducer,
    dashboard: DashboardReducer,
    
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      serializableCheck: false,
    }
})
})


