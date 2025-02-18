function openForm(service) {
    document.getElementById('service').value = service;
    document.getElementById('formPopup').style.display = 'block';
}

function closeForm() {
    document.getElementById('formPopup').style.display = 'none';
}

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const requests = document.getElementById('requests').value;
    const terms = document.getElementById('terms').checked;

    if (!name || !email || !phone || !service || !date || !terms) {
        alert('Please fill out all required fields and agree to the terms.');
        return;
    }

    const appointment = {
        name,
        email,
        phone,
        service,
        date,
        requests,
        status: 'Pending'
    };

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    displayAppointments();
    closeForm();
    alert(`Thank you, ${name}! Your appointment for ${service} on ${date} is confirmed.`);
});

function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointmentsDiv = document.getElementById('appointments');
    appointmentsDiv.innerHTML = '<h2>Booked Appointments</h2>';
    appointments.forEach((appt, index) => {
        const apptDiv = document.createElement('div');
        apptDiv.innerHTML = `
            <p><strong>Name:</strong> ${appt.name}</p>
            <p><strong>Service:</strong> ${appt.service}</p>
            <p><strong>Date & Time:</strong> ${appt.date}</p>
            <p><strong>Status:</strong> ${appt.status}</p>
        `;
        appointmentsDiv.appendChild(apptDiv);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayAppointments();
});

