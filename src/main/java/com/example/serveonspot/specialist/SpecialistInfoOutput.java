package com.example.serveonspot.specialist;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SpecialistInfoOutput {

    private Integer specialistId;
    private String specialistType;

    public SpecialistInfoOutput(Specialist specialist) {
        this.specialistId = specialist.getSpecialistId();
        this.specialistType = generateSpecialistTypeReadable(specialist.getSpecialistType());
    }

    private String generateSpecialistTypeReadable(SpecialistType type) {
        String typeName = null;
        switch (type) {
            case ONE_MINUTE:
                typeName = "1";
                break;
            case FIVE_MINUTES:
                typeName = "5";
                break;
            case NINE_MINUTES:
                typeName = "9";
                break;
            default:
                typeName = " ";
        }
        String typeSuffix = " min. specialistas";

        return typeName + typeSuffix;
    }

}
