import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../_utils/firebase";

export async function addToWishlist(deal) {
    const user = auth.currentUser;

    if (!user) {
        alert("Please sign in to add to wishlist");
        return;
    }

    try {
        const wishlistRef = doc(db, "wishlists", user.uid);
        await setDoc(
        wishlistRef,
        {
            userId: user.uid,
            deals: arrayUnion({
            title: deal.title,
            salePrice: deal.salePrice,
            link: deal.dealId
            }),
        },
        { merge: true }
        );

        console.log("Wishlist item added successfully.");
    } catch (e) {
        console.error("Error adding to wishlist: ", e);
    }
}
