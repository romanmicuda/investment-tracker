package com.personal.finance.tracker.demo.category.web.bodies;

import org.checkerframework.checker.nonempty.qual.NonEmpty;

import lombok.Data;

@Data
public class CreateCategoryRequest {
    @NonEmpty
    private String category;
}
