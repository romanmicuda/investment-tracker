package com.personal.finance.tracker.demo.category.web.bodies;

import lombok.Data;

@Data
public class CreateCategoryRequest {
    // @NonEmpty
    private String category;
}
