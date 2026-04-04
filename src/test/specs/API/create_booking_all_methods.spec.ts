import test, { expect } from "@playwright/test";


test("Create Booking -End to End, Cover all methods", async ({ request }) => {

    const baseURL = "https://restful-booker.herokuapp.com";

    //Auth Token
    const responseAuth = await request.post(`${baseURL}/auth`, {
        data: {
            username: "admin",
            password: "password123"
        }
    })

    const bodyAuth = await responseAuth.json();
    console.log("token = " + bodyAuth.token);

    //POST
    const respone = await request.post(`${baseURL}/booking`, {
        data: {
            firstname: 'John',
            lastname: 'Doe',
            totalprice: 1000,
            depositpaid: true,
            bookingdates: {
                checkin: '2024-01-01',
                checkout: '2024-01-05'
            },
            additionalneeds: 'Breakfast'
        }
    })
    const body = await respone.json();
    console.log("Created Record = " + body.bookingid);

    const createdBookingId = body.bookingid;

    //GET
    const response1 = await request.get(`${baseURL}/booking/${createdBookingId}`);
    const body1 = await response1.json();
    console.log("first name = " + body1.firstname);
    expect(body1.firstname).toEqual('John');

    //PUT
    const response3 = await request.put(`${baseURL}/booking/${createdBookingId}`, {
        headers: {
            Cookie: `token=${bodyAuth.token}`
        },
        data: {
            firstname: 'Updated',
            lastname: 'User',
            totalprice: 2000,
            depositpaid: false,
            bookingdates: {
                checkin: '2024-02-01',
                checkout: '2024-02-10'
            },
            additionalneeds: 'Lunch'
        }
    })

    const body3 = await response3.json();
    console.log("Updated User first name = " + body3.firstname)
    expect(body3.firstname).toBe('Updated');


    //DELTE
    const response4 = await request.delete(`${baseURL}/booking/${createdBookingId}`, {
        headers: {
            Cookie: `token=${bodyAuth.token}`
        }
    });
})