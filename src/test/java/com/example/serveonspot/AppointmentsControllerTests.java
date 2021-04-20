package com.example.serveonspot;

import com.example.serveonspot.user.AppUser;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AppointmentsControllerTests {

    @Autowired
    private TestRestTemplate template;

    @Test
    public void givenAuthRequestOnPrivateService_shouldFailWith401() throws Exception {
        ResponseEntity<AppUser> result = template.withBasicAuth("ADMIN", "ADMIN")
                .getForEntity("/api/appointments", AppUser.class);
        assertEquals(HttpStatus.UNAUTHORIZED, result.getStatusCode());
    }

}
