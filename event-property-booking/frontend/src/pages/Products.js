// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box,
//   Paper, Chip, IconButton, Rating, CircularProgress, Alert
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// const Products = () => {
//   const { eventType } = useParams();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState({});
//   const [eventInfo, setEventInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const deliveryCharge = 200; // Fixed delivery charge
//   useEffect(() => {
//     setLoading(true);
//     const event = tamilNaduEvents.find(e => e.type === eventType);
//     const productsForEvent = getProductsByEventType(eventType);
//     if (event && productsForEvent) {
//       setEventInfo(event);
//       setProducts(productsForEvent);
//     }
//     setTimeout(() => setLoading(false), 300);
//   }, [eventType]);
//   const handleQuantityChange = (productId, change) => {
//     setCart(prev => ({
//       ...prev,
//       [productId]: Math.max(0, (prev[productId] || 0) + change)
//     }));
//   };

//   const handleBookNow = () => {
//     const selectedProducts = products
//       .filter(product => cart[product.id] > 0)
//       .map(product => ({
//         ...product,
//         quantity: cart[product.id]
//       }));

//     if (selectedProducts.length === 0) {
//       alert('Please add at least one item to book.');
//       return;
//     }

//     navigate(`/booking/${eventType}`, {
//       state: {
//         selectedProducts,
//         eventName: eventInfo?.name,
//         eventTamilName: eventInfo?.tamilName,
//         deliveryCharge: deliveryCharge, // Pass delivery charge
//         totalAmount: getTotalPrice()
//       }
//     });
//   };

//   const getTotalItems = () => Object.values(cart).reduce((sum, q) => sum + q, 0);

//   const getTotalPrice = () => {
//     const productsTotal = products.reduce((total, p) => total + (parseInt(p.price) * (cart[p.id] || 0)), 0);
//     return productsTotal + (getTotalItems() > 0 ? deliveryCharge : 0);
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress size={60} /></Box>;
//   }
  
//   if (!eventInfo || products.length === 0) {
//     return <Alert severity="warning" sx={{ m: 4 }}>Products for this event are not available yet. Please check back later.</Alert>
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ textAlign: 'center', mb: 6, p: 4, bgcolor: '#f8f9fa', borderRadius: 3 }}>
//         <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{eventInfo.name}</Typography>
//         <Typography variant="h5" sx={{ color: 'secondary.main', mb: 2 }}>{eventInfo.tamilName}</Typography>
//         <Typography variant="h6" color="text.secondary">{eventInfo.description}</Typography>
//       </Box>

//       <Grid container spacing={4}>
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={4} key={product.id}>
//             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
//               <CardMedia component="img" height="200" image={product.image} alt={product.name} sx={{ objectFit: 'cover' }} />
//               <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
//                 <Box>
//                   <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{product.name}</Typography>
//                   <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: '500' }}>{product.tamilName}</Typography>
//                 </Box>
//                 <Rating value={product.rating} readOnly size="small" sx={{ my: 1 }} />
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>{product.description}</Typography>
//                 <Box sx={{ mb: 2 }}>
//                   {product.features.map((feature) => (
//                     <Chip key={feature} label={feature} size="small" variant="outlined" sx={{ mr: 1, mb: 1 }} />
//                   ))}
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
//                   <Box>
//                     <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>₹{product.price}</Typography>
//                     <Typography variant="body2" color="text.secondary">{product.unit}</Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <IconButton size="small" onClick={() => handleQuantityChange(product.id, -1)} disabled={!cart[product.id]}><RemoveIcon /></IconButton>
//                     <Typography variant="h6" sx={{ minWidth: '30px', textAlign: 'center' }}>{cart[product.id] || 0}</Typography>
//                     <IconButton size="small" onClick={() => handleQuantityChange(product.id, 1)}><AddIcon /></IconButton>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {getTotalItems() > 0 && (
//         <Paper
//           elevation={8}
//           sx={{
//             position: 'fixed',
//             bottom: 20,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             p: 3,
//             zIndex: 1000,
//             width: { xs: '90%', sm: 'auto' },
//             minWidth: { sm: '400px' },
//           }}
//         >
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//             🛒 {getTotalItems()} Items | Subtotal: ₹{getTotalPrice() - deliveryCharge} | Delivery: ₹{deliveryCharge} | Total: ₹{getTotalPrice()}
//           </Typography>
//           <Button variant="contained" size="large" onClick={handleBookNow} fullWidth>
//             Book Selected Products
//           </Button>
//         </Paper>
//       )}
//     </Container>
//   );
// };

// // ====================================================================
// //                       PRODUCT DATA (PORUTKAL)
// // ====================================================================

// // --- Common Products (Podhuvana Porutkal) ---
// const commonProducts = {
//   chairs_plastic: { id: 'c1', name: 'Plastic Chairs', tamilName: 'பிளாஸ்டிக் நாற்காலிகள்', price: '5/day', unit: 'Per Chair', description: 'Standard plastic chairs for guest seating.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763303609/Plastic_Chair_bvagbm.jpg', rating: 4.3, features: ['Lightweight', 'Stackable'] },
//   tables_food: { id: 'c3', name: 'Food Tables', tamilName: 'உணவு மேசைகள்', price: '400/day', unit: 'Per Table', description: 'Large tables for serving food during the feast.', image: 'https://placehold.co/400x300/36454F/white?text=Food+Tables', rating: 4.6, features: ['Large Size', 'With Covers'] },
//   chairs_cushion: { id: 'c2', name: 'Cushion Chairs', tamilName: 'குஷன் நாற்காலிகள்', price: '150/day', unit: 'Per Chair', description: 'Comfortable cushioned chairs for guests with covers.', image: 'https://placehold.co/400x300/6B2D5C/white?text=Cushion+Chairs', rating: 4.5, features: ['Comfortable', 'With Covers', 'Elegant'] },
//   tables_round: { id: 'c3', name: 'Round Tables', tamilName: 'வட்ட மேசைகள்', price: '400/day', unit: 'Per Table', description: 'Tables for guest seating during the feast.', image: 'https://placehold.co/400x300/36454F/white?text=Round+Tables', rating: 4.6, features: ['Seats 8', 'With Covers'] },
//   sound_small: { id: 'c4', name: 'Small Sound System', tamilName: 'சிறிய ஒலி அமைப்பு', price: '1500/day', unit: 'Full Set', description: 'Sound system with two speakers and a mic.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763303609/SmallSoundSystem_wwx47j.jpg', rating: 4.5, features: ['2 Speakers', 'Mic', 'Bluetooth'] },
//   lights_serial: { id: 'c5', name: 'Serial Lights', tamilName: 'சீரியல் லைட்ஸ்', price: '500/day', unit: 'Per String', description: 'Decorative string lights to illuminate the area.', image: 'https://m.media-amazon.com/images/I/61v0xblrtnL.jpg', rating: 4.5, features: ['Multi-color', 'LED'] },
//   pandal_shamiana: { id: 'c6', name: 'Shamiana Pandal', tamilName: 'பந்தல்', price: '3000/day', unit: 'Per Unit', description: 'Temporary roof structure for welcoming guests.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763303609/Pandhal_yosyfo.jpg', rating: 4.6, features: ['Waterproof', 'Spacious'] },
// };

// // --- Kalyanam / Nichayathartham / Valaikappu ---
// const weddingFamilyProducts = [
//   { id: 'w1', name: 'Marriage Mandapam or Decorations ', tamilName: 'கல்யாண மண்டபம்', price: '50000/day', unit: 'Full Setup', description: 'Grand stage decoration for the main wedding ceremony.', image: 'https://placehold.co/400x300/667eea/white?text=Mandapam', rating: 4.8, features: ['Flower Decor', 'LED Lights', 'Traditional'] },
//   commonProducts.chairs_cushion,
//   { id: 'w2', name: 'Nalangu / Seemantham Set', tamilName: 'நலங்கு / சீமந்தம் செட்', price: '2000/day', unit: 'Complete Set', description: 'Traditional items for pre-wedding/baby shower ceremonies.', image: 'https://placehold.co/400x300/764ba2/white?text=Nalangu+Set', rating: 4.7, features: ['Manai', 'Rose Water', 'Sandhanam'] },
//   commonProducts.tables_round,
//   { id: 'w5', name: 'Buffet Counters', tamilName: 'பஃபே கவுண்டர்கள்', price: '800/day', unit: 'Per Counter', description: 'Counters for serving food in a buffet system.', image: 'https://placehold.co/400x300/028A0F/white?text=Buffet+Counters', rating: 4.5, features: ['Hygienic', 'With Warmers'] },
//   { id: 'w6', name: 'Welcome Banner', tamilName: 'வரவேற்பு பேனர்', price: '1000/day', unit: 'Per Banner', description: 'Customized welcome banner with names.', image: 'https://placehold.co/400x300/C41E3A/white?text=Welcome+Banner', rating: 4.8, features: ['Custom Design', 'High Quality Print'] },
//   { id: 'w7', name: 'Photo Booth', tamilName: 'புகைப்பட சாவடி', price: '2000/day', unit: 'Full Setup', description: 'Themed booth for guests to take photos.', image: 'https://placehold.co/400x300/FF69B4/white?text=Photo+Booth', rating: 4.7, features: ['Themed', 'Props Included'] },
//   commonProducts.lights_serial,
// ];

// // --- Grahapravesam / Funeral ---
// const homeCeremonyProducts = [
//   commonProducts.pandal_shamiana,
//   commonProducts.chairs_plastic,
//   { id: 'h3', name: 'Jamakkalam (Floor Mats)', tamilName: 'ஜமுக்காளம்', price: '200/day', unit: 'Per Mat', description: 'Traditional floor mats for sitting during ceremonies.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763304598/FloorMats_odx3s0.jpg', rating: 4.7, features: ['Traditional', 'Clean'] },
//   { id: 'h4', name: 'Brass Pooja Vessels', tamilName: 'பித்தளை பூஜை பாத்திரங்கள்', price: '1000/day', unit: 'Full Set', description: 'A complete set of brass vessels for the main pooja.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763304501/pooja_vessels_iyem7p.webp', rating: 4.8, features: ['Authentic', 'Complete Set'] },
//   commonProducts.lights_serial,
//   { id: 'h6', name: 'Cooking Vessels Set', tamilName: 'சமையல் பாத்திரங்கள்', price: '2500/day', unit: 'Full Set', description: 'Large vessels for cooking feast for guests.', image: 'data:image/jpeg;base64,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', rating: 4.6, features: ['Large Size', 'Steel'] },
// ];

// // --- Piranthanaal Vila (Birthday Party) ---
// const birthdayProducts = [
//   { id: 'b2', name: 'Balloon Decoration', tamilName: 'பலூன் அலங்காரம்', price: '2000/day', unit: 'Full Setup', description: 'Complete balloon decoration for the party hall.', image: 'https://www.srkevents.co.in/img/birthday%20party%20organizer%20in%20coimbatore.jpeg ', rating: 4.8, features: ['Arch', 'Pillars', 'Helium'] },
//   { id: 'b1', name: 'Theme Backdrop', tamilName: 'தீம் பேக்டிராப்', price: '1500/day', unit: 'Full Setup', description: 'Backdrop based on themes like cartoons for kids.', image: 'https://i.pinimg.com/1200x/dd/50/9a/dd509abcd97f7a37cc98530ad13c1dad.jpg', rating: 4.7, features: ['Cartoon Themes', 'Customizable'] },
//   { id: 'b3', name: 'Cake Table', tamilName: 'கேக் டேபிள்', price: '500/day', unit: 'Per Table', description: 'A decorated table for cake cutting ceremony.', image: 'https://i.pinimg.com/1200x/b8/97/ad/b897ada92d363463c7b6cd4f1c97177c.jpg', rating: 4.6, features: ['With Frills', 'Spotlight'] },
//   commonProducts.sound_small,
//   { id: 'b5', name: 'Kids Chairs & Tables', tamilName: 'குழந்தைகள் நாற்காலி', price: '5/day', unit: 'Per Set', description: 'Small and colorful chairs & tables for kids.', image: 'https://i.pinimg.com/736x/be/11/c5/be11c539ffdccfc53484848fe9217f87.jpg', rating: 4.4, features: ['Colorful', 'Safe'] },
// ];

// // --- Periya Kootathukku (Public/Large Events) ---
// const publicEventProducts = [
//   { id: 'p1', name: 'Large Stage Setup', tamilName: 'பெரிய மேடை அமைப்பு', price: '5000', unit: 'Full Setup', description: 'Elevated stage for speakers, performers, or leaders.', image: 'data:image/jpeg;base64,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', rating: 4.8, features: ['Large Size', 'Sturdy', 'Professional'] },
//   { id: 'p2', name: 'Outdoor Sound System', tamilName: 'வெளிப்புற ஒலி அமைப்பு', price: '5000', unit: 'Full Setup', description: 'Loudspeaker system for announcements and speeches.', image: 'data:image/jpeg;base64,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', rating: 4.6, features: ['Horn Speakers', 'Long Range', 'Multiple Mics'] },
//   commonProducts.chairs_plastic,
//   { id: 'p3', name: 'LED Video Wall', tamilName: 'LED வீடியோ சுவர்', price: '12000', unit: 'Per Day', description: 'Large screen for live video display.', image: 'https://placehold.co/400x300/8E44AD/white?text=LED+Wall', rating: 4.9, features: ['High Definition', 'Large Size'] },
//   { id: 'p4', name: 'Barricades', tamilName: 'தடுப்புகள்', price: '100', unit: 'Per Piece', description: 'Steel barricades for crowd control.', image: 'https://placehold.co/400x300/7F8C8D/white?text=Barricades', rating: 4.5, features: ['Steel', 'Interlocking'] },
//   { id: 'p5', name: 'Professional Lighting', tamilName: 'தொழில்முறை லைட்டிங்', price: '6000', unit: 'Full Setup', description: 'PAR cans, strobes, and spotlights for stage lighting.', image: 'https://svsolutionsusa.com/wp-content/uploads/2024/08/LED-Stage-for-Sangeet-in-Tulare-1024x585.jpg', rating: 4.7, features: ['PAR Cans', 'Spotlights'] },
// ];

// // --- Arayankirathukku (Indoor Events) ---
// const indoorEventProducts = [
//   commonProducts.chairs_cushion,
//   { id: 'i1', name: 'Podium / Lectern', tamilName: 'மேடை / விரிவுரைபீடம்', price: '700', unit: 'Per Piece', description: 'A stand for speakers to place their notes.', image: 'https://placehold.co/400x300/BDC3C7/white?text=Podium', rating: 4.6, features: ['Wooden', 'With Mic Stand'] },
//   { id: 'i2', name: 'Projector & Screen', tamilName: 'புரொஜெக்டர் & திரை', price: '600', unit: 'Full Set', description: 'Projector and screen for presentations.', image: 'https://placehold.co/400x300/34495E/white?text=Projector', rating: 4.7, features: ['HD Projector', 'Large Screen'] },
//   { id: 'i3', 'name': 'Conference Tables', 'tamilName': 'கருத்தரங்கு மேசைகள்', 'price': '800', 'unit': 'Per Table', 'description': 'Professional conference tables for corporate meetings.', 'image': 'https://placehold.co/400x300/95A5A6/white?text=Conference+Table', 'rating': 4.5, 'features': ['Professional', 'Sturdy'] },
//   { id: 'i4', 'name': 'PA System', 'tamilName': 'PA அமைப்பு', 'price': '3000', 'unit': 'Full Set', 'description': 'Clear audio system for indoor halls.', 'image': 'https://placehold.co/400x300/2C3E50/white?text=PA+System', 'rating': 4.6, 'features': ['Collar Mic', 'Hand Mic'] },
// ];

// // Intha function, sariyana product list-ah return pannum
// const getProductsByEventType = (type) => {
//   const productMap = {
//     'wedding': weddingFamilyProducts, 'reception': weddingFamilyProducts, 'engagement': weddingFamilyProducts, 'baby-shower': weddingFamilyProducts,
//     'house-warming': homeCeremonyProducts, 'funeral': homeCeremonyProducts,
//     'birthday': birthdayProducts,
//     'temple-function': publicEventProducts, 'music-concert': publicEventProducts, 'political-rally': publicEventProducts, 'cultural-event': publicEventProducts,
//     'corporate-event': indoorEventProducts, 'seminar': indoorEventProducts, 'annual-day': indoorEventProducts, 'exhibition': indoorEventProducts,
//   };
//   return productMap[type] || [];
// };

// // ====================================================================
// //                       EVENT DATA (NIGALVUGAL)
// // ====================================================================
// const tamilNaduEvents = [
//     { type: 'wedding', name: 'Wedding', tamilName: 'கல்யாணம்', description: 'Complete wedding arrangements' },
//     { type: 'reception', name: 'Reception', tamilName: 'ரிசப்ஷன்', description: 'Grand reception party setups' },
//     { type: 'engagement', name: 'Engagement', tamilName: 'நிச்சயதார்த்தம்', description: 'Intimate engagement ceremonies' },
//     { type: 'temple-function', name: 'Temple Function', tamilName: 'கோவில் உற்சவம்', description: 'Traditional temple event setups' },
//     { type: 'birthday', name: 'Birthday Party', tamilName: 'பிறந்தநாள் விழா', description: 'Fun party decorations and themes' },
//     { type: 'house-warming', name: 'House Warming', tamilName: 'கிருகப்பிரவேசம்', description: 'Traditional house warming events' },
//     { type: 'music-concert', name: 'Music Concert', tamilName: 'இசை கச்சேரி', description: 'Stage and sound for concerts' },
//     { type: 'corporate-event', name: 'Corporate Event', tamilName: 'நிறுவன நிகழ்வு', description: 'Professional corporate setups' },
//     { type: 'annual-day', name: 'Annual Day', tamilName: 'வருடாந்திர தினம்', description: 'School & college annual days' },
//     { type: 'baby-shower', name: 'Baby Shower', tamilName: 'சீமந்தம்', description: 'Traditional baby shower events' },
//     { type: 'political-rally', name: 'Political Rally', tamilName: 'அரசியல் கூட்டம்', description: 'Large scale rally arrangements' },
//     { type: 'exhibition', name: 'Exhibition', tamilName: 'கண்காட்சி', description: 'Trade shows and exhibition stalls' },
//     { type: 'cultural-event', name: 'Cultural Event', tamilName: 'கலாச்சார நிகழ்வு', description: 'Traditional cultural programs' },
//     { type: 'seminar', name: 'Seminar', tamilName: 'கருத்தரங்கு', description: 'Educational seminar setups' },
//     { type: 'funeral', name: 'Funeral Ceremony', tamilName: 'இறுதி சடங்கு', description: 'Respectful funeral arrangements' }
// ];

// export default Products;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box,
  Paper, Chip, IconButton, Rating, CircularProgress, Alert, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Products = () => {
  const { eventType } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [eventInfo, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const deliveryCharge = 200; 

  useEffect(() => {
    const allProductList = [
      ...Object.values(commonProducts),
      ...weddingFamilyProducts,
      ...homeCeremonyProducts,
      ...birthdayProducts,
      ...publicEventProducts,
      ...indoorEventProducts,
      ...kedaVettuProducts,
      ...earPiercingProducts
    ];

    const uniqueProducts = Array.from(new Map(allProductList.map(item => [item.id, item])).values());
    localStorage.setItem('allProducts', JSON.stringify(uniqueProducts));

    setLoading(true);
    const event = tamilNaduEvents.find(e => e.type === eventType);
    const productsForEvent = getProductsByEventType(eventType);

    if (event && productsForEvent) {
      setEventInfo(event);
      const uniqueEventProducts = Array.from(new Map(productsForEvent.map(item => [item.id, item])).values());
      setProducts(uniqueEventProducts);
    }
    setTimeout(() => setLoading(false), 300);
  }, [eventType]);

  // Logic for +/- buttons
  const handleQuantityChange = (productId, change) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  // Logic for Manual Input (Square Feet)
  const handleManualInputChange = (productId, value) => {
    const qty = parseInt(value) || 0; 
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, qty)
    }));
  };

  const handleBookNow = () => {
    const selectedProducts = products
      .filter(product => cart[product.id] > 0)
      .map(product => ({
        ...product,
        quantity: cart[product.id]
      }));

    if (selectedProducts.length === 0) {
      alert('Please add at least one item to book.');
      return;
    }

    navigate(`/booking/${eventType}`, {
      state: {
        selectedProducts,
        eventName: eventInfo?.name,
        eventTamilName: eventInfo?.tamilName,
        deliveryCharge: deliveryCharge,
        totalAmount: getTotalPrice()
      }
    });
  };

  const getTotalItems = () => Object.values(cart).reduce((sum, q) => sum + q, 0);

  const getTotalPrice = () => {
    const productsTotal = products.reduce((total, p) => total + (parseInt(p.price) * (cart[p.id] || 0)), 0);
    return productsTotal + (getTotalItems() > 0 ? deliveryCharge : 0);
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress size={60} /></Box>;
  }
  
  if (!eventInfo || products.length === 0) {
    return <Alert severity="warning" sx={{ m: 4 }}>Products for this event are not available yet. Please check back later.</Alert>
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6, p: 4, bgcolor: '#f8f9fa', borderRadius: 3 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{eventInfo.name}</Typography>
        <Typography variant="h5" sx={{ color: 'secondary.main', mb: 2 }}>{eventInfo.tamilName}</Typography>
        <Typography variant="h6" color="text.secondary">{eventInfo.description}</Typography>
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
              <CardMedia component="img" height="200" image={product.image} alt={product.name} sx={{ objectFit: 'cover' }} />
              <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{product.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: '500' }}>{product.tamilName}</Typography>
                </Box>
                <Rating value={product.rating} readOnly size="small" sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>{product.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  {product.features.map((feature) => (
                    <Chip key={feature} label={feature} size="small" variant="outlined" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>₹{product.price}</Typography>
                    <Typography variant="body2" color="text.secondary">{product.unit}</Typography>
                  </Box>

                  {product.isSquareFeet ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                       <TextField 
                          label="Sq.Ft" 
                          type="number" 
                          variant="outlined" 
                          size="small" 
                          sx={{ width: '100px' }}
                          value={cart[product.id] || ''}
                          onChange={(e) => handleManualInputChange(product.id, e.target.value)}
                          placeholder="0"
                       />
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={() => handleQuantityChange(product.id, -1)} disabled={!cart[product.id]}><RemoveIcon /></IconButton>
                      <Typography variant="h6" sx={{ minWidth: '30px', textAlign: 'center' }}>{cart[product.id] || 0}</Typography>
                      <IconButton size="small" onClick={() => handleQuantityChange(product.id, 1)}><AddIcon /></IconButton>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {getTotalItems() > 0 && (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            p: 3, zIndex: 1000, width: { xs: '90%', sm: 'auto' }, minWidth: { sm: '400px' },
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
             🛒 {getTotalItems()} Items | Total: ₹{getTotalPrice()}
          </Typography>
          <Button variant="contained" size="large" onClick={handleBookNow} fullWidth>
            Book Selected Products
          </Button>
        </Paper>
      )}
    </Container>
  );
};

// ====================================================================
//                       PRODUCT DATA
// ====================================================================

const commonProducts = {
  // 1. Compulsory Pandhal Types
  pandal_normal: { id: 'pan_normal', name: 'Coconut Leaf Pandal', tamilName: 'கீற்று பந்தல் (சாதா)', price: '12', unit: 'Per Sq.Ft', isSquareFeet: true, description: 'Traditional cool coconut leaf shed.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763303609/Pandhal_yosyfo.jpg', rating: 4.5, features: ['Traditional', 'Cooling', 'Low Cost'] },
  pandal_steel: { id: 'pan_steel', name: 'Steel Roof Pandal', tamilName: 'தகர பந்தல்', price: '35', unit: 'Per Sq.Ft', isSquareFeet: true, description: 'Strong steel sheet roofing for rain protection.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763532489/SteelRoofPandhal_jqmkyu.webp', rating: 4.7, features: ['Waterproof', 'Strong', 'Rain Protection'] },
  pandal_shamiana: { id: 'pan_shamiana', name: 'Shamiana Pandal', tamilName: 'ஷாமியானா பந்தல்', price: '25', unit: 'Per Sq.Ft', isSquareFeet: true, description: 'Decorative cloth pandal for grand look.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763532618/ShaamianaPandhal_zaedqg.png', rating: 4.8, features: ['Decorative', 'Colorful', 'Grand Look'] },

  // 2. Furniture Essentials
  chairs_plastic: { id: 'c1', name: 'Plastic Chairs', tamilName: 'பிளாஸ்டிக் நாற்காலிகள்', price: '5', unit: 'Per Chair', description: 'Standard plastic chairs for guest seating.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763303609/Plastic_Chair_bvagbm.jpg', rating: 4.3, features: ['Lightweight', 'Stackable', 'Furniture'] },
  tables_food: { id: 'c3_food', name: 'Food Tables', tamilName: 'உணவு மேசைகள்', price: '400', unit: 'Per Table', description: 'Large tables for serving food during the feast.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763362419/FoodTable_y1bxi1.webp', rating: 4.6, features: ['Large Size', 'With Covers', 'Furniture'] },
  
  // 3. Compulsory Sound System Items
  speaker_jbl_srx: { id: 'sp_jbl1', name: 'JBL SRX725 Speaker', tamilName: 'JBL SRX725 ஸ்பீக்கர்', price: '1500', unit: 'Per Unit', description: 'High power JBL SRX dual bass speaker.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763532696/JBL_SRX_725_hhblm8.webp', rating: 4.9, features: ['High Bass', 'JBL Original', 'Clear Sound'] },
  speaker_jbl_4box: { id: 'sp_jbl2', name: 'JBL Box Set', tamilName: 'JBL 4 பாக்ஸ் செட்', price: '3000', unit: 'Set of 4', description: 'Set of 4 JBL Box speakers for surrounding sound.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763533242/JBL_4_BOX_ygnhie.jpg', rating: 4.8, features: ['Surround Sound', 'Clear Treble', 'Sound System'] },
  mic_set: { id: 'sp_mic', name: 'Professional Mics', tamilName: 'மைக் செட்', price: '500', unit: 'Set of 2', description: 'Wireless and wired microphones.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763533377/mics_in3b7m.png', rating: 4.5, features: ['Wireless', 'Clear Voice', 'Long Range'] },
  speaker_horn: { id: 'sp_horn', name: 'Horn Speaker', tamilName: 'குழாய் ஸ்பீக்கர்', price: '400', unit: 'Per Unit', description: 'Long range horn speaker for announcements.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763477603/HORNSPEAKER_kyhyzj.jpg', rating: 4.4, features: ['Long Range', 'Outdoor', 'Announcement'] },

  // 4. Other Common Items
  chairs_cushion: { id: 'c2', name: 'Cushion Chairs', tamilName: 'குஷன் நாற்காலிகள்', price: '150', unit: 'Per Chair', description: 'Comfortable cushioned chairs for guests with covers.', image: 'https://placehold.co/400x300/6B2D5C/white?text=Cushion+Chairs', rating: 4.5, features: ['Comfortable', 'With Covers', 'Elegant', 'Furniture'] },
  tables_round: { id: 'c3_round', name: 'Round Tables', tamilName: 'வட்ட மேசைகள்', price: '400', unit: 'Per Table', description: 'Tables for guest seating during the feast.', image: 'https://placehold.co/400x300/36454F/white?text=Round+Tables', rating: 4.6, features: ['Seats 8', 'With Covers', 'Furniture'] },
  lights_serial: { id: 'c5', name: 'Serial Lights', tamilName: 'சீரியல் லைட்ஸ்', price: '500', unit: 'Per String', description: 'Decorative string lights to illuminate the area.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763536714/WhatsApp_Image_2025-11-19_at_12.48.29_927b944d_itfpm2.jpg', rating: 4.5, features: ['Multi-color', 'LED', 'Lighting'] },
  coffee_drum: { id: 'c7', name: 'Coffee/Tea Drum', tamilName: 'காபி/டீ டிரம்', price: '300', unit: 'Per Drum (10L)', description: 'Insulated drum to keep beverages hot.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763362723/Screenshot_2025-11-17_122814_alur4q.png', rating: 4.4, features: ['Insulated', '10 Litre'] },
  jugs_set: { id: 'c8', name: 'Water Jugs (Set of 5)', tamilName: 'தண்ணீர் ஜக்குகள்', price: '150', unit: 'Per Set', description: 'Set of 5 plastic/steel water jugs for serving.', image: 'https://placehold.co/400x300/87CEEB/white?text=Jugs', rating: 4.2, features: ['5 Jugs', 'Serving'] },
  floor_mats: { id: 'h3', name: 'Jamakkalam (Floor Mats)', tamilName: 'ஜமுக்காளம்', price: '200', unit: 'Per Mat', description: 'Traditional floor mats for sitting during ceremonies.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763304598/FloorMats_odx3s0.jpg', rating: 4.7, features: ['Traditional', 'Clean', 'Furniture'] },
  cooking_vessels: { id: 'h6', name: 'Cooking Vessels Set', tamilName: 'சமையல் பாத்திரங்கள்', price: '2500', unit: 'Full Set', description: 'Large vessels for cooking feast for guests.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763363198/CookingVessel_SAPADU_POSI_uwbqjs.webp', rating: 4.6, features: ['Large Size', 'Steel'] },
};

// ✅✅ THE COMPULSORY LIST ✅✅
const standardEssentials = [
  commonProducts.pandal_normal,
  commonProducts.pandal_steel,
  commonProducts.pandal_shamiana,
  commonProducts.tables_food,    
  commonProducts.chairs_plastic, 
  commonProducts.speaker_jbl_srx,
  commonProducts.speaker_jbl_4box,
  commonProducts.mic_set,        
  commonProducts.speaker_horn    
];

// --- Kalyanam / Nichayathartham / Valaikappu ---
const weddingFamilyProducts = [
  ...standardEssentials, 
  { id: 'w1', name: 'Marriage Mandapam or Decorations ', tamilName: 'கல்யாண மண்டபம்', price: '50000', unit: 'Full Setup', description: 'Grand stage decoration for the main wedding ceremony.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763533797/mandapam_decorations_boqucv.jpg', rating: 4.8, features: ['Flower Decor', 'LED Lights', 'Traditional', 'Decoration'] },
  commonProducts.chairs_cushion,
  { id: 'w2', name: 'Nalangu / Seemantham Set', tamilName: 'நலங்கு / சீமந்தம் செட்', price: '2000', unit: 'Complete Set', description: 'Traditional items for pre-wedding/baby shower ceremonies.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763533938/nalanguset_yreyxm.png', rating: 4.7, features: ['Manai', 'Rose Water', 'Sandhanam', 'Traditional'] },
  commonProducts.tables_round,
  { id: 'w6', name: 'Welcome Banner', tamilName: 'வரவேற்பு பேனர்', price: '1000', unit: 'Per Banner', description: 'Customized welcome banner with names.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763536603/WelcomeLight_bpuxzt.jpg', rating: 4.8, features: ['Custom Design', 'High Quality Print', 'Decoration'] },
  commonProducts.lights_serial,
];

// --- Grahapravesam / Funeral ---
const homeCeremonyProducts = [
  ...standardEssentials, 
  commonProducts.floor_mats,
  { id: 'h4', name: 'Brass Pooja Vessels', tamilName: 'பித்தளை பூஜை பாத்திரங்கள்', price: '1000', unit: 'Full Set', description: 'A complete set of brass vessels for the main pooja.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763304501/pooja_vessels_iyem7p.webp', rating: 4.8, features: ['Authentic', 'Complete Set', 'Traditional'] },
  commonProducts.lights_serial,
  commonProducts.cooking_vessels,
];

// --- Birthday Party ---
const birthdayProducts = [
  ...standardEssentials, 
  { id: 'b2', name: 'Balloon Decoration', tamilName: 'பலூன் அலங்காரம்', price: '2000', unit: 'Full Setup', description: 'Complete balloon decoration for the party hall.', image: 'https:www.srkevents.co.in/img/birthday%20party%20organizer%20in%20coimbatore.jpeg ', rating: 4.8, features: ['Arch', 'Pillars', 'Helium', 'Decoration'] },
  { id: 'b1', name: 'Theme Backdrop', tamilName: 'தீம் பேக்டிராப்', price: '1500', unit: 'Full Setup', description: 'Backdrop based on themes like cartoons for kids.', image: 'https://i.pinimg.com/1200x/dd/50/9a/dd509abcd97f7a37cc98530ad13c1dad.jpg', rating: 4.7, features: ['Cartoon Themes', 'Customizable', 'Decoration'] },
  { id: 'b3', name: 'Cake Table', tamilName: 'கேக் டேபிள்', price: '500', unit: 'Per Table', description: 'A decorated table for cake cutting ceremony.', image: 'https://i.pinimg.com/1200x/b8/97/ad/b897ada92d363463c7b6cd4f1c97177c.jpg', rating: 4.6, features: ['With Frills', 'Spotlight', 'Furniture'] },
  { id: 'b5', name: 'Kids Chairs & Tables', tamilName: 'குழந்தைகள் நாற்காலி', price: '5', unit: 'Per Set', description: 'Small and colorful chairs & tables for kids.', image: 'https://i.pinimg.com/736x/be/11/c5/be11c539ffdccfc53484848fe9217f87.jpg', rating: 4.4, features: ['Colorful', 'Safe', 'Furniture'] },
];

// --- Public/Large Events ---
const publicEventProducts = [
  ...standardEssentials, 
  { id: 'p1', name: 'Large Stage Setup', tamilName: 'பெரிய மேடை அமைப்பு', price: '5000', unit: 'Full Setup', description: 'Elevated stage for speakers, performers, or leaders.', image: 'https://res.cloudinary.com/dzavyq7el/image/upload/v1763533622/stagesetup_aaqkzv.jpg', rating: 4.8, features: ['Large Size', 'Sturdy', 'Professional', 'Stage'] },
  { id: 'p5', name: 'Professional Lighting', tamilName: 'தொழில்முறை லைட்டிங்', price: '6000', unit: 'Full Setup', description: 'PAR cans, strobes, and spotlights for stage lighting.', image: 'https://svsolutionsusa.com/wp-content/uploads/2024/08/LED-Stage-for-Sangeet-in-Tulare-1024x585.jpg', rating: 4.7, features: ['PAR Cans', 'Spotlights', 'Lighting'] },
];

// --- Indoor Events ---
const indoorEventProducts = [
  ...standardEssentials, 
  commonProducts.chairs_cushion,
  { id: 'i2', name: 'Projector & Screen', tamilName: 'புரொஜெக்டர் & திரை', price: '600', unit: 'Full Set', description: 'Projector and screen for presentations.', image: 'https://placehold.co/400x300/34495E/white?text=Projector', rating: 4.7, features: ['HD Projector', 'Large Screen', 'Audio Visual'] },
  { id: 'i3', 'name': 'Conference Tables', 'tamilName': 'கருத்தரங்கு மேசைகள்', 'price': '800', 'unit': 'Per Table', 'description': 'Professional conference tables for corporate meetings.', 'image': 'https:placehold.co/400x300/95A5A6/white?text=Conference+Table', 'rating': 4.5, 'features': ['Professional', 'Sturdy', 'Furniture'] },
];

// --- Keda Vettu ---
const kedaVettuProducts = [
  ...standardEssentials, 
  commonProducts.cooking_vessels,
  commonProducts.coffee_drum,
];

// --- Ear Piercing ---
const earPiercingProducts = [
  ...standardEssentials, 
  commonProducts.floor_mats,
  commonProducts.coffee_drum,
  commonProducts.jugs_set,
  commonProducts.cooking_vessels,
];


// ====================================================================
//                       EVENT DATA
// ====================================================================

const getProductsByEventType = (type) => {
  const productMap = {
    'wedding': weddingFamilyProducts, 
    'reception': weddingFamilyProducts, 
    'engagement': weddingFamilyProducts, 
    'baby-shower': weddingFamilyProducts,
    
    'house-warming': homeCeremonyProducts, 
    'funeral': homeCeremonyProducts,
    
    'birthday': birthdayProducts,
    
    'temple-function': publicEventProducts, 
    'music-concert': publicEventProducts, 
    'political-rally': publicEventProducts, 
    'cultural-event': publicEventProducts,
    
    'corporate-event': indoorEventProducts, 
    'seminar': indoorEventProducts, 
    'annual-day': indoorEventProducts, 
    'exhibition': indoorEventProducts,
    
    'ear-piercing': earPiercingProducts,
    'keda-vettu': kedaVettuProducts,
  };
  return productMap[type] || [];
};


const tamilNaduEvents = [
    { type: 'wedding', name: 'Wedding', tamilName: 'கல்யாணம்', description: 'Complete wedding arrangements' },
    { type: 'reception', name: 'Reception', tamilName: 'ரிசப்ஷன்', description: 'Grand reception party setups' },
    { type: 'engagement', name: 'Engagement', tamilName: 'நிச்சயதார்த்தம்', description: 'Intimate engagement ceremonies' },
    
    { type: 'temple-function', name: 'Temple Function', tamilName: 'கோவில் உற்சவம்', description: 'Traditional temple event setups' },
    { type: 'birthday', name: 'Birthday Party', tamilName: 'பிறந்தநாள் விழா', description: 'Fun party decorations and themes' },
    
    { type: 'ear-piercing', name: 'Ear Piercing', tamilName: 'காது குத்து விழா', description: 'Setups for traditional ear piercing ceremonies' },
    { type: 'keda-vettu', name: 'Keda Vettu', tamilName: 'கிடா வெட்டு', description: 'Arrangements for large family feasts' },

    { type: 'house-warming', name: 'House Warming', tamilName: 'கிருகப்பிரவேசம்', description: 'Traditional house warming events' },
    { type: 'music-concert', name: 'Music Concert', tamilName: 'இசை கச்சேரி', description: 'Stage and sound for concerts' },
    { type: 'corporate-event', name: 'Corporate Event', tamilName: 'நிறுவன நிகழ்வு', description: 'Professional corporate setups' },
    { type: 'annual-day', name: 'Annual Day', tamilName: 'வருடாந்திர தினம்', description: 'School & college annual days' },
    { type: 'baby-shower', name: 'Baby Shower', tamilName: 'சீமந்தம்', description: 'Traditional baby shower events' },
    { type: 'political-rally', name: 'Political Rally', tamilName: 'அரசியல் கூட்டம்', description: 'Large scale rally arrangements' },
    { type: 'exhibition', name: 'Exhibition', tamilName: 'கண்காட்சி', description: 'Trade shows and exhibition stalls' },
    { type: 'cultural-event', name: 'Cultural Event', tamilName: 'கலாச்சார நிகழ்வு', description: 'Traditional cultural programs' },
    { type: 'seminar', name: 'Seminar', tamilName: 'கருத்தரங்கு', description: 'Educational seminar setups' },
    { type: 'funeral', name: 'Funeral Ceremony', tamilName: 'இறுதி சடங்கு', description: 'Respectful funeral arrangements' }
];

export default Products;