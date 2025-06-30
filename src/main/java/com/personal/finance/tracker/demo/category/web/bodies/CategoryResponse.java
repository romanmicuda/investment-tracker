package com.personal.finance.tracker.demo.category.web.bodies;

import java.util.UUID;

import com.personal.finance.tracker.demo.category.data.Category;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponse {
    private UUID id;
    private String name;


    public CategoryResponse(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }
    
}
