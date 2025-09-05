"use client"
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";
import { useStoreManager } from "../../stores/storeManager";
import { useEffect, useState } from "react";

const StoreNavbar = ({ slug }) => {
    console.log(slug);
    
    const { getTotalItems } = useCartStore();
    const {getStoreBySlug} =  useStoreManager()
    const navigate = useNavigate();
    const totalItems = getTotalItems();
    const [store, setStore] = useState()

    useEffect(() => {
     const getStore = async ()=>{
        const store = await getStoreBySlug(slug)
        setStore(store)
        console.log(store);
     }
     getStore()
    }, [])
    
    
    return (
        <div className="flex items-center sticky top-0 z-50 justify-between px-4 py-3 bg-white shadow-md rounded-md">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
                <img
                    className="rounded-full w-12 h-12 object-cover border border-gray-200"
                    src={store?.logo}
                    alt="Store Logo"
                />
                <p className="text-lg sm:text-xl font-semibold text-gray-800 truncate max-w-[150px] sm:max-w-[250px]">
                    {store?.name}
                </p>
            </div>

            {/* Cart */}
            <div>
                {totalItems > 0 && (
                    <Link to={`/${slug}/cart`} className="relative">
                        <ShoppingCart className="h-7 w-7 text-gray-700 hover:text-yellow-500 transition-colors" />
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    </Link>
                )}
            </div>
        </div>

    );
};

export default StoreNavbar;
