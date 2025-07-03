package com.personal.finance.tracker.demo.category.logic;

import java.util.List;
import java.util.UUID;

import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.user.data.User;

public interface CategoryService {

    public Category getCategoryById(UUID id) throws NotFoundException;
    public List<Category> getAllCategories(User appUser);
    public Category saveCategory(String categoryName, User appUser);
    public Category getCategoryByName(String name, User appUser) throws NotFoundException;
    public void deleteCategory(UUID id, User appUser) throws NotFoundException;
    public Category renameCategory(UUID id, String newName) throws NotFoundException;
}
