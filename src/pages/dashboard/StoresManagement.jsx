
import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StoresHeader from "../../components/dashboard/StoresHeader";
import StoreSearch from "../../components/dashboard/StoreSearch";
import StoresList from "../../components/dashboard/StoresList";

const StoresManagement = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores } = useStoreManager();
  const [userStores, setUserStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // console.log(getUserStores());

  console.log("Hi");

  const fetchUserStore = async () => {
    const stores = await getUserStores(currentUser.id);
    console.log(stores);
    setUserStores(stores);
  }


  useEffect(() => {
    console.log("hello");

    if (currentUser) {
      fetchUserStore()
    }

  }, [currentUser, getUserStores]);

  const filteredStores = userStores?.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (store.description && store.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <StoresHeader />
      <StoreSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <StoresList
        stores={filteredStores}
        searchTerm={searchTerm}
        onClearSearch={() => setSearchTerm("")}
      />
    </DashboardLayout>
  );
};

export default StoresManagement;
