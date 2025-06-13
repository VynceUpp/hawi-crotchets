import { Award, Clock, Heart, Instagram, MessageCircle, Sparkles, Users, Youtube } from "lucide-react";

export const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    description: "Started crocheting as a hobby during college, creating small gifts for friends and family.",
    icon: Heart,
  },
  {
    year: "2022",
    title: "First Sale",
    description: "Sold my first handmade scarf to a neighbor, marking the beginning of Hawi Crotchets.",
    icon: Sparkles,
  },
  {
    year: "2023",
    title: "Growing Community",
    description: "Reached 50+ happy customers and began offering custom orders and workshops.",
    icon: Users,
  },
  {
    year: "2025",
    title: "Recognition",
    description: "Received recognition at BabaDogo's annual business expo, solidifying Hawi Crotchets as a reputable brand.",
    icon: Award,
  },
];

export const values = [
  {
    title: "Handmade Quality",
    description: "Every piece is carefully crafted by hand with attention to every stitch and detail.",
    icon: "🧶",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Sustainable Materials",
    description: "We use eco-friendly yarns and materials that are gentle on both you and the environment.",
    icon: "🌱",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Custom Creations",
    description: "Each piece can be personalized to your preferences, colors, and specific needs.",
    icon: "✨",
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Community Love",
    description: "Supporting local artisans and giving back to our community through workshops and donations.",
    icon: "💝",
    color: "from-blue-500 to-cyan-500",
  },
];

export const stats = [
  { number: "50+", label: "Happy Customers", icon: Users },
  { number: "100+", label: "Items Created", icon: Sparkles },
  { number: "4", label: "Years Experience", icon: Clock },
  { number: "20+", label: "Custom Orders", icon: Heart },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mwangi",
    location: "Nairobi, Kenya",
    rating: 5,
    product: "Custom Baby Blanket",
    text: "Loise created the most beautiful baby blanket for my newborn daughter. The attention to detail and the softness of the yarn made it absolutely perfect. Every stitch was made with love, and you can truly feel it. This blanket has become our family's most treasured possession.",
    image: "/api/placeholder/60/60",
    verified: true,
    date: "2024-12-15"
  },
  {
    id: 2,
    name: "James Ochieng",
    location: "Mombasa, Kenya",
    rating: 5,
    product: "Wool Scarf Set",
    text: "I ordered matching scarves for my family as Christmas gifts, and they exceeded all expectations. The quality is outstanding, and each scarf has its own unique personality while maintaining the same beautiful pattern. Highly recommend Hawi Crotchets!",
    image: "/api/placeholder/60/60",
    verified: true,
    date: "2024-11-28"
  },
  {
    id: 3,
    name: "Grace Kipchoge",
    location: "Eldoret, Kenya",
    rating: 5,
    product: "Crochet Workshop",
    text: "Attending Loise's crochet workshop was life-changing! Her patience and teaching style made learning so enjoyable. I went from complete beginner to creating my own dishcloths in just one session. She's not just talented but also an amazing teacher.",
    image: "/api/placeholder/60/60",
    verified: true,
    date: "2024-10-20"
  },
  {
    id: 4,
    name: "Michael Wanjiku",
    location: "Kisumu, Kenya",
    rating: 5,
    product: "Custom Sweater",
    text: "The custom sweater Loise made for my wife's birthday was absolutely stunning. She captured exactly what I described and added her own creative touches that made it even more special. The fit was perfect, and my wife hasn't stopped wearing it!",
    image: "/api/placeholder/60/60",
    verified: true,
    date: "2024-09-10"
  },
  {
    id: 5,
    name: "Fatuma Hassan",
    location: "Nairobi, Kenya",
    rating: 5,
    product: "Home Decor Set",
    text: "The crochet home decor pieces transformed my living room completely. The throw pillows and wall hangings add such a cozy, personal touch to my space. Everyone who visits asks where I got them. Loise's work is truly art!",
    image: "/api/placeholder/60/60",
    verified: true,
    date: "2024-08-22"
  },
  {
    id: 6,
    name: "David Mutua",
    location: "Nakuru, Kenya",
    rating: 5,
    product: "Pet Accessories",
    text: "My dog's custom sweater and blanket set is the cutest thing ever! Loise even matched the colors to my dog's personality. The quality is fantastic, and they've held up perfectly through countless washes. My pup looks like a fashion model!",
    image: "/api/placeholder/60/60",
    verified: true,
    date: "2024-07-18"
  }
];

export const footerLinks = {
  shop: [
    { name: "All Products", href: "#" },
    { name: "Baby Items", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "Home Decor", href: "#" },
    { name: "Custom Orders", href: "#" },
    { name: "Gift Cards", href: "#" }
  ],
  services: [
    { name: "Crochet Workshops", href: "#" },
    { name: "Private Lessons", href: "#" },
    { name: "Custom Designs", href: "#" },
    { name: "Repair Services", href: "#" },
    { name: "Bulk Orders", href: "#" },
    { name: "Consultations", href: "#" }
  ],
  about: [
    { name: "Our Story", href: "#" },
    { name: "Meet Loise", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
    { name: "Sustainability", href: "#" }
  ],
  support: [
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Shipping Info", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Size Guide", href: "#" },
    { name: "Care Instructions", href: "#" }
  ]
};

export const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/hawi_crochets/",
    color: "hover:text-pink-500",
    followers: "277"
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/c/254728984143",
    color: "hover:text-green-500",
    followers: "Chat"
  },
  {
    name: "Youtube",
    icon: Youtube,
    href: "https://www.youtube.com/@HawiCrochets",
    color: "hover:text-red-500",
    followers: "1.2K"
  }
];

export const products = [
  {
    id: 1,
    name: "Crotchet Coverup",
    price: 1500,
    originalPrice: 2000,
    image: "/skirt.jpg",
    category: "Accessories",
    rating: 4.8,
    reviews: 24,
    colors: ["White", "Black", "Red"],
    isNew: true,
    isSale: true,
    slug: "crotchet-coverup"
  },
  {
    id: 2,
    name: "Yarn Bag",
    price: 1800,
    image: "/bag.jpg",
    category: "Bags",
    rating: 4.9,
    reviews: 18,
    colors: ["Natural", "Brown", "Black", "Purple"],
    isNew: false,
    isSale: false,
    slug: "yarn-bag"
  },
  {
    id: 3,
    name: "Baby Fashion",
    price: 2000,
    originalPrice: 2500,
    image: "/hawi.jpg",
    category: "Baby",
    rating: 5.0,
    reviews: 32,
    colors: ["Green", "Blue", "Yellow", "White"],
    isNew: false,
    isSale: true,
    slug: "baby-fashion"
  },
  {
    id: 4,
    name: "Decorative Throw Pillow",
    price: 28,
    image: "/api/placeholder/280/280",
    category: "Home Decor",
    rating: 4.7,
    reviews: 15,
    colors: ["Cream", "Sage", "Terracotta"],
    isNew: true,
    isSale: false,
    slug: "decorative-throw-pillow"
  },
  {
    id: 5,
    name: "Warm Beanie Hat",
    price: 3500,
    originalPrice: 4000,
    image: "/hats.jpg",
    category: "Accessories",
    rating: 4.6,
    reviews: 21,
    colors: ["Yellow", "Black", "Green"],
    isNew: false,
    isSale: true,
    slug: "warm-beanie-hat"
  },
  {
    id: 6,
    name: "Market Basket",
    price: 55,
    image: "/api/placeholder/280/280",
    category: "Home",
    rating: 4.8,
    reviews: 12,
    colors: ["Natural", "White"],
    isNew: true,
    isSale: false,
    slug: "market-basket"
  },
  {
    id: 7,
    name: "Crotchet Shirt",
    price: 1200,
    originalPrice: 1500,
    image: "/cardigan.jpg",
    category: "Clothing",
    rating: 4.9,
    reviews: 28,
    colors: ["Oatmeal", "Sage", "Dusty Pink", "Blue",],
    isNew: false,
    isSale: true,
    slug: "crotchet-shirt"
  },
  {
    id: 8,
    name: "Fringes",
    price: 1800,
    image: "/fringes.jpg",
    category: "Clothing",
    rating: 4.5,
    reviews: 9,
    colors: ["Pink", "White", "Black"],
    isNew: true,
    isSale: false,
    slug: "fringes"
  },
];

export const sampleProduct = {
  id: 1,
  name: "Premium Wireless Headphones",
  category: "Electronics",
  brand: "TechSound Pro",
  price: 12500,
  originalPrice: 18000,
  rating: 4.7,
  TotalReviews: 243,
  isNew: true,
  isSale: true,
  inStock: true,
  stockCount: 28,
  estimatedDelivery: "2-3 business days",
  colors: ["Midnight Black", "Pure White", "Rose Gold", "Space Gray"],
  sizes: ["One Size"],
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"
  ],
  description: "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and superior comfort for all-day wear. Perfect for music lovers, professionals, and anyone who values high-quality sound.",
  features: [
    "Active Noise Cancellation (ANC)",
    "30-hour battery life with quick charge",
    "Premium leather ear cushions",
    "Bluetooth 5.0 connectivity",
    "Built-in microphone for calls",
    "Foldable design for portability",
    "Multi-device pairing",
    "Touch controls"
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Impedance": "32 Ohms",
    "Battery Life": "30 hours",
    "Charging Time": "2 hours",
    "Weight": "250g",
    "Connectivity": "Bluetooth 5.0, 3.5mm jack",
    "Warranty": "2 years"
  },
  careInstructions: [
    "Clean with a soft, dry cloth",
    "Avoid exposure to water or moisture",
    "Store in the provided carrying case",
    "Charge regularly to maintain battery health",
    "Handle cables gently to prevent damage"
  ],
  reviews: [
    {
      id: 1,
      name: "John K.",
      rating: 5,
      comment: "Amazing sound quality and comfort. Worth every penny!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Sarah M.",
      rating: 4,
      comment: "Great headphones, battery life is impressive.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Mike R.",
      rating: 5,
      comment: "Perfect for my daily commute. Noise cancellation works great!",
      date: "2 weeks ago"
    }
  ]
};