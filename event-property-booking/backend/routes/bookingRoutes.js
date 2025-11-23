// // // backend/routes/bookingRoutes.js

// // const express = require('express');
// // const router = express.Router();
// // const Booking = require('../models/Booking.js'); // Namma Booking Model
// // const Product = require('../models/Product.js'); // Stock check panna

// // // Itha namma 'middleware' nu solluvom.
// // // Ithu user login pannirukara nu check pannum.
// // // Login panniruntha mattum thaan booking panna mudiyum.
// // const { protect, admin } = require('../middleware/authMiddleware.js'); // Intha file-a namma aduthu create pannuvom


// // // POST /api/bookings/
// // // Oru puthu booking-a create pannum (User-ku mattum)
// // // 'protect' function moolama, user login panniruntha mattum thaan ithu velai seiyum
// // router.post('/', protect, async (req, res) => {
    
// //     const {
// //         products, // [{ product: '...id...', quantity: 2 }, ...]
// //         totalPrice,
// //         eventDate,
// //         customerName,
// //         customerPhone,
// //         deliveryAddress,
// //         locationLink
// //     } = req.body;

// //     // --- Stock Check & Availability Check (Inime Add Pannalam) ---
// //     // Intha idathula thaan namma "Intha date la intha product free ah?" nu check pannanum.
// //     // Ippothaiku, namma simple ah booking-a create pannalam.

// //     try {
// //         const booking = new Booking({
// //             user: req.user._id, // 'protect' function, login pannuna user details-a 'req.user' la podum
// //             products: products.map(p => ({
// //                 product: p.product,
// //                 quantity: p.quantity,
// //                 pricePerItem: p.pricePerItem // Itha namma frontend la irunthu anupanum
// //             })),
// //             totalPrice,
// //             eventDate,
// //             customerName,
// //             customerPhone,
// //             deliveryAddress,
// //             locationLink
// //         });

// //         const createdBooking = await booking.save();
// //         res.status(201).json(createdBooking);

// //     } catch (error) {
// //         res.status(500).json({ message: 'Server Error', error: error.message });
// //     }
// // });


// // // --- ADMIN VELAI ---

// // // GET /api/bookings/
// // // Yella bookings-ayum eduthutu varum (Admin-ku mattum)
// // // 'protect' -> Login pannirukanum
// // // 'admin' -> Login pannavar 'admin'-ah irukanum
// // router.get('/', protect, admin, async (req, res) => {
// //     try {
// //         const bookings = await Booking.find({})
// //             .populate('user', 'name email') // User details-a serthu anupu
// //             .populate('products.product', 'name price imageUrl'); // Product details-a serthu anupu
        
// //         res.json(bookings);
// //     } catch (error) {
// //         res.status(500).json({ message: 'Server Error', error: error.message });
// //     }
// // });

// // // PUT /api/bookings/:id/status
// // // Oru booking-oda status-a maathurathu (Admin-ku mattum)
// // router.put('/:id/status', protect, admin, async (req, res) => {
// //     try {
// //         const booking = await Booking.findById(req.params.id);

// //         if (booking) {
// //             booking.status = req.body.status || booking.status; // 'Confirmed', 'Cancelled'
// //             const updatedBooking = await booking.save();
// //             res.json(updatedBooking);
// //         } else {
// //             res.status(404).json({ message: 'Booking not found' });
// //         }
// //     } catch (error) {
// //         res.status(500).json({ message: 'Server Error', error: error.message });
// //     }
// // });

// // // DELETE /api/bookings/:id
// // // Oru booking-a delete panrathu (Admin-ku mattum)
// // router.delete('/:id', protect, admin, async (req, res) => {
// //     try {
// //         const booking = await Booking.findById(req.params.id);

// //         if (booking) {
// //             await booking.deleteOne(); // Mongoose v9+
// //             res.json({ message: 'Booking removed' });
// //         } else {
// //             res.status(404).json({ message: 'Booking not found' });
// //         }
// //     } catch (error) {
// //         res.status(500).json({ message: 'Server Error', error: error.message });
// //     }
// // });


// // module.exports = router;
// // backend/routes/bookingRoutes.js

// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // 1. CREATE: Puthu Booking Create Panna
// router.post('/', async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     const savedBooking = await newBooking.save();
//     res.status(201).json(savedBooking);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// // 2. GET ALL: Admin Dashboard-ku ella bookings-um eduka
// router.get('/', async (req, res) => {
//   try {
//     const bookings = await Booking.find().sort({ createdAt: -1 }); // Puthusu mela varum
//     res.status(200).json(bookings);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // 3. GET USER BOOKINGS: User "My Bookings" page-ku
// router.get('/user/:email', async (req, res) => {
//   try {
//     const bookings = await Booking.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
//     res.status(200).json(bookings);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // 4. UPDATE: Admin Confirm/Cancel panna
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedBooking);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // 5. DELETE: Booking-a delete panna
// router.delete('/:id', async (req, res) => {
//   try {
//     await Booking.findByIdAndDelete(req.params.id);
//     res.status(200).json("Booking deleted successfully");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST - Create new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
});

// GET - All bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// ✅ ADD THIS ROUTE - Update booking status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log('📝 Updating booking status:', { id, status });

    // Find by numeric ID field (your custom id)
    const booking = await Booking.findOneAndUpdate(
      { id: parseInt(id) }, 
      { status: status },
      { new: true } // Return updated document
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    console.log('✅ Booking status updated:', booking.id, '->', booking.status);
    res.json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    console.error('❌ Error updating booking status:', error);
    res.status(400).json({ message: 'Error updating booking status', error: error.message });
  }
});

// ✅ ADD THIS ROUTE - Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Deleting booking:', id);

    const booking = await Booking.findOneAndDelete({ id: parseInt(id) });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    console.log('✅ Booking deleted from MongoDB:', id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting booking:', error);
    res.status(400).json({ message: 'Error deleting booking', error: error.message });
  }
});

module.exports = router;