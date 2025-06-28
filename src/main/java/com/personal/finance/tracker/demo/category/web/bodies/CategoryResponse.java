package com.personal.finance.tracker.demo.category.web.bodies;

import com.personal.finance.tracker.demo.category.data.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponse {
    private String name;

    public CategoryResponse(Category category) {
        this.name = category.getName();
    }
    
}
