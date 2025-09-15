import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { toast } from "sonner";
import { useAuthStore } from "../../stores/useAuthStore";
import axios from "axios";
import { Link } from "react-router-dom";

const Settings = () => {
  const { currentUser } = useAuthStore();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/api/payment/user-subcription`, {
          withCredentials: true
        }
        );
        setSubscriptions(data.subscription || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load subscriptions");
      }
    };

    fetchSubscriptions();
  }, [currentUser?.id]);

  const handleDeleteSubscription = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/api/payment/subscription-cancel`, {
        withCredentials: true
      }
      );
      toast.success("Subscription canceled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete subscription");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Account Settings</h1>
        <p className="text-gray-600">
          Manage your account and subscription details
        </p>
      </div>

      {/* User Profile */}
      <Card className="mb-8 shadow-lg border rounded-2xl">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          <CardDescription>
            Manage your personal details and subscription information
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name || "User Avatar"}
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-3xl font-bold text-gray-600 shadow-md">
                  {currentUser?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              {/* Small badge */}
              <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{currentUser?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{currentUser?.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Plan</p>
                  <p className="font-medium text-indigo-600">
                    {subscriptions?.status == 'ACTIVE'? 'Premium' : "Free Trial"}
                  </p>
                </div>
                <div className="">
                  <p className="text-gray-500">Joined On</p>
                  <p className="font-medium text-gray-900">
                    {currentUser?.createdAt
                      ? new Date(currentUser.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Subscriptions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>
            Manage your active and past subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {subscriptions.length === 0 && (
            <p className="text-gray-600 text-sm">No subscriptions found</p>
          )}

          {
            <div
              className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                <p>
                  <strong>Plan:</strong> {subscriptions?.name || "Premium"}
                </p>
                <p>
                  <strong >Status:</strong> <span className={`${subscriptions?.status === 'ACTIVE' ? 'text-green-500' : 'text-red-600'}`}>{subscriptions?.status?.toLocaleUpperCase() || "N/A"}</span>
                </p>
                <p>
                  <strong>Started:</strong>{" "}
                  {new Date(subscriptions?.startedAt).toLocaleDateString()}
                </p>
                {/* <p>
                  <strong>Expires:</strong>{" "}
                  {subscriptions?.expiresAt
                    ? new Date(subscriptions.expiresAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Subscription ID:</strong>{" "}
                  {subscriptions?.razorpaySubscriptionId}
                </p> */}
              </div>
              <div className="mt-4 md:mt-0">
                {
                  subscriptions.status == 'ACTIVE' ? <div>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteSubscription()}
                    >
                      Cancel Subscription
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      * Payments are not refundable upon cancellation of subscription.
                    </p>
                  </div> : <Link to={"/pricing"}>
                    <Button
                      variant="outline"
                      className="hover:bg-green-300"
                    >
                      Buy Premium
                    </Button>
                  </Link>
                }
              </div>
            </div>
          }
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all of your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button variant="destructive" className="cursor-pointer">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Settings;
