
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Store, Sparkles } from "lucide-react";

const NoStoresState = () => {
  return (
    <Card className="border-dashed border-2">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
          <Store className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl mb-2">Create Your Store</CardTitle>
        <p className="text-muted-foreground max-w-md mx-auto">
          You haven't created your store yet. Start building your online presence and showcase your products to the world.
        </p>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/dashboard/create-store">
              <Sparkles className="h-4 w-4" />
              Create Your Store
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          It only takes a few minutes to get started
        </p>
      </CardContent>
    </Card>
  );
};

export default NoStoresState;
