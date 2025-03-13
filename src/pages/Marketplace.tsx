import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProductsAPI } from '@/lib/mockApi';
import { Product } from '@/lib/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Search, Filter, MapPin } from 'lucide-react';

const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showOrganic, setShowOrganic] = useState(false);
  const [showInStock, setShowInStock] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await mockProductsAPI.getAll();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
        toast({
          title: 'Error',
          description: 'Failed to load products. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [toast]);

  useEffect(() => {
    // Filter products based on search term and filters
    let result = [...products];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(term) || 
        product.type.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategory) {
      result = result.filter(product => product.type === selectedCategory);
    }
    
    if (showOrganic) {
      result = result.filter(product => product.organic);
    }
    
    if (showInStock) {
      result = result.filter(product => product.inStock);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, showOrganic, showInStock]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === 'all' ? '' : value);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setShowOrganic(false);
    setShowInStock(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-farm-green" />
          <p className="text-farm-dark-gray">Loading marketplace products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-farm-dark-gray">Marketplace</h1>
          <p className="text-farm-dark-gray/70">Discover fresh, high-quality products from local farms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2 text-farm-green" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSearch}>
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="flex">
                    <Input
                      id="search"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button type="submit" className="rounded-l-none bg-farm-green hover:bg-farm-green/90">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="grain">Grain</SelectItem>
                    <SelectItem value="forestry">Forestry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Product Attributes</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="organic" 
                    checked={showOrganic} 
                    onCheckedChange={(checked) => setShowOrganic(checked === true)}
                  />
                  <Label htmlFor="organic" className="cursor-pointer">Organic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="inStock" 
                    checked={showInStock} 
                    onCheckedChange={(checked) => setShowInStock(checked === true)}
                  />
                  <Label htmlFor="inStock" className="cursor-pointer">In Stock</Label>
                </div>
              </div>

              <Separator />

              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-farm-dark-gray/70">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{product.title}</CardTitle>
                      {product.organic && (
                        <Badge className="bg-farm-green text-white">Organic</Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-farm-brown" />
                      {product.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Price:</span>
                      <span className="font-medium">{product.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Category:</span>
                      <span className="font-medium capitalize">{product.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Status:</span>
                      <Badge variant={product.inStock ? "outline" : "secondary"} className={product.inStock ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                    {product.description && (
                      <p className="text-sm text-farm-dark-gray/80 mt-2">
                        {product.description.length > 100 
                          ? `${product.description.substring(0, 100)}...` 
                          : product.description}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      className="w-full bg-farm-brown hover:bg-farm-brown/90"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-farm-beige/10 rounded-lg p-8 text-center">
              <p className="text-farm-dark-gray mb-2">No products found matching your criteria.</p>
              <p className="text-farm-dark-gray/70">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace; 