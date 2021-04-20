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
class UserControllerTests {

    @Autowired
    private TestRestTemplate template;


    @Test
    public void givenAuthRequestOnPrivateService_shouldFailWith401() throws Exception {
        ResponseEntity<AppUser> result = template.withBasicAuth("ADMIN", "ADMIN")
                .getForEntity("/api/user", AppUser.class);
        assertEquals(HttpStatus.UNAUTHORIZED, result.getStatusCode());
    }

    @Test
    public void givenAuthRequestOnPrivateService_shouldSucceedWith200() throws Exception {
        ResponseEntity<AppUser> result = template.withBasicAuth("admin", "admin")
                .getForEntity("/api/user", AppUser.class);
        assertEquals(HttpStatus.OK, result.getStatusCode());
    }


// TODO test anonymous

}
