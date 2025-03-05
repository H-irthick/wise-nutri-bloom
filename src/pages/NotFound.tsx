
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-[70vh] flex flex-col items-center justify-center px-4"
      >
        <div className="relative mb-8">
          <div className="text-[160px] font-bold text-nutriwise-100">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl md:text-5xl font-bold text-nutriwise-600">Oops!</span>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          This page has gone missing
        </h1>
        
        <p className="text-muted-foreground text-lg max-w-md text-center mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="bg-nutriwise-600 hover:bg-nutriwise-700 text-white"
            size="lg"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            Return Home
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default NotFound;
