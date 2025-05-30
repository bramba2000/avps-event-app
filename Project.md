# Project Title: AVPS Flight Booking Application

**Objective:** Develop a web application for booking seats on a special flight event. The application must handle the entire booking lifecycle, including initial reservation, confirmations, reminders, check-in, payment tracking (on-site), and cancellations, with specific logic for group bookings and event management by administrators. A key feature is the final event confirmation the day before, dependent on weather conditions.

**Core Event Details:**
*   **Event Name:** (To be defined, e.g., "AVPS Concorezzo Flight Experience")
*   **Date:** Sunday, June 8, 2025
*   **First Flight Time:** 18:30 (Europe/Rome timezone)
*   **Last Flight Slot Ends:** 19:33 (Europe/Rome timezone)
*   **Location:** Parco di Villa Zoja, Via Libertà 74, 20863 Concorezzo (MB), Italy
*   **Payment:** €10 per person, collected on-site.

---

## Key Features & Requirements:

### 1. Event & Flight Slot Management:
1.1. The system shall define flight slots with a duration of 7 minutes each (1 min ascent, 5 mins in air, 1 min descent).
1.2. Flight slots shall be available from 18:30, with 10 consecutive slots, ending at 19:33.
1.3. Each flight slot shall have a maximum capacity of 8 people.
1.4. Total event capacity is 80 people across all slots.

### 2. Public Booking Interface:
2.1. Users shall be able to access a booking form.
2.2. The booking form must collect the following mandatory information:
    2.2.1. First Name
    2.2.2. Last Name
    2.2.3. Email (this will serve as the primary key for a group/family booking)
    2.2.4. Phone Number
    2.2.5. Number of Adults (age ≥ 14 years)
    2.2.6. Number of Children (age < 14 years)
2.3. Booking Logic:
    2.3.1. The system must attempt to book the selected number of people into available slots.
    2.3.2. If a group booking (based on a single email submission) exceeds 8 people, the system must automatically assign them to consecutive available slots.
    2.3.3. For group bookings spanning multiple slots, email consistency must be maintained.
    2.3.4. For any booking involving children, there must be at least 1 adult for every 2 children. The system should enforce this rule.
2.4. "Sold Out" Behavior:
    2.4.1. If all slots are full, the booking form shall be disabled.
    2.4.2. A "sold out" message shall be displayed to users attempting to book when no capacity remains.
2.5. Static Information Display:
    2.5.1. The application should display general event information (date, time, location).
    2.5.2. The application should display directions to the venue, including:
        2.5.2.1. Exact address: Via Libertà 74, 20863 Concorezzo (MB), Italy
        2.5.2.2. Public transport information:
            *   Bus routes: Z321, Z322, Z323, Z315 (stopping in Concorezzo town center).
            *   Example route from Milan Porta Garibaldi: S8 train to Monza, then Bus Z322 towards Concorezzo, stop at Via Libertà/Villa Zoja (200m walk).

### 3. Booking Confirmation & Verification (Anti-Spam):
3.1. Upon submission of the booking form, the system shall send an email to the provided email address with a unique verification link.
3.2. The booking shall be considered tentative until verified via this link.
3.3. If the booking is not verified by clicking the link within 20 minutes, the reserved spots shall be automatically released and made available again.

### 4. Post-Verification Communication:
4.1. Immediate Email Confirmation (after verification link is clicked):
    4.1.1. Content: Exact flight slot time(s) assigned, instructions to arrive 20 minutes before the scheduled flight time, information about on-site payment (€10 per person).
    4.1.2. Reply-To address for this email: `segreteria@avps.it`.
    4.1.3. The email must state that the final event confirmation is dependent on weather conditions and will be sent the day before the event (triggered manually by an admin).
4.2. Automatic Reminder Email:
    4.2.1. The system shall send an automatic reminder email 2 hours before the user's scheduled meeting time (which is 20 mins before their flight time).

### 5. User Authentication & Profile:
5.1. Users shall undergo a simple authentication process (e.g., email/password or magic link).
5.2. Authenticated users shall be able to view their own bookings.

### 6. Individual Cancellations (User-initiated):
6.1. Users shall be able to cancel their booking up to 1 hour before their scheduled flight time.
6.2. Upon cancellation, the system shall immediately send a cancellation confirmation email to the user.
6.3. Cancelled spots shall be made available in real-time for new bookings.

### 7. Admin Module & Roles (AVPS Admin):
7.1. Secure admin authentication.
7.2. Admin Dashboard functionalities:
    7.2.1. **View bookings:** Display all bookings, filterable or viewable per flight slot.
    7.2.2. **Event Cancellation (Bad Weather):**
        7.2.2.1. A button/feature labeled "Cancel Event – Bad Weather".
        7.2.2.2. Activating this feature shall trigger an email to all confirmed participants notifying them of the event cancellation. This email must be AVPS branded.
    7.2.3. **Final Event Confirmation:**
        7.2.3.1. A manual trigger/button for admins to send the final "Go-Ahead" confirmation email to all participants the day before the event (June 7, 2025), after assessing weather conditions.
    7.2.4. **Check-in Management:**
        7.2.4.1. Interface to mark participants as "checked-in".
        7.2.4.2. Interface to mark payments as "received" (flag: "payment_made").
    7.2.5. **Reporting:**
        7.2.5.1. Export booking reports in CSV format.
        7.2.5.2. Export booking reports in PDF format.
7.3. Admin capability to manage (trigger/oversee) automated emails.

### 8. Branding:
8.1. All outgoing emails (confirmations, reminders, cancellations, etc.) must use AVPS branding (logo, colors, layout).
8.2. Reference official channels for branding consistency:
    8.2.1. Website: `https://www.avps.it`
    8.2.2. Facebook: `@avpsvimercate`
    8.2.3. Instagram: `@avpsvimercate`

### 9. Non-Functional Requirements:
9.1. **Timezone:** All event-related times are Europe/Rome. The system should handle this correctly.
9.2. **Real-time updates:** Slot availability and cancellations should reflect in real-time.
9.3. **Scalability:** While the initial event is for 80 people, the system should be designed with potential future events in mind (though not explicitly required to handle larger simultaneous loads without further specification).
9.4. **User Experience:** The booking process should be intuitive and user-friendly.

---

### Technical Considerations (for LLM elaboration):
*   Database schema design (Bookings, Users, Slots, Event entities).
*   API endpoint design.
*   Choice of backend/frontend technologies.
*   Email service integration.
*   Security considerations for user data and admin access.