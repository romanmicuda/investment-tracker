package com.personal.finance.tracker.demo.category.logic;

import java.util.List;
import java.util.UUID;

import com.personal.finance.tracker.demo.appUser.data.AppUser;
import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.exception.NotFoundException;

public interface CategoryService {

    public Category getCategoryById(UUID id) throws NotFoundException;
    public List<Category> getAllCategories(AppUser appUser);
    public Category saveCategory(String categoryName, AppUser appUser);
    
}
