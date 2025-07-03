package com.personal.finance.tracker.demo.category.logic;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.category.data.CategoryRepository;
import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.user.data.User;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category getCategoryById(UUID id) throws NotFoundException {
        return categoryRepository.findByIdAndDeletableFalse(id);
    }

    @Override
    public List<Category> getAllCategories(User appUser) {
        return categoryRepository.findAllByUserAndDeletableFalse(appUser);
    }

    @Override
    public Category saveCategory(String categoryName, User appUser) {
        Category category = new Category();
        category.setName(categoryName);
        category.setUser(appUser);
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryByName(String name, User appUser) throws NotFoundException {
        Category category = categoryRepository.findByNameAndUserAndDeletableFalse(name, appUser);
        if (category == null) {
            throw new NotFoundException("Category not found with name: " + name);
        }
        return category;
    }

    @Override
    public void deleteCategory(UUID id, User appUser) throws NotFoundException {
        Category category = categoryRepository.findByIdAndDeletableFalse(id);
        if (!category.getUser().equals(appUser)) {
            throw new NotFoundException("Category not found with id: " + id + " for user: " + appUser.getUsername());
        }
        category.setDeletable(true);
        categoryRepository.save(category);
    }

    @Override
    public Category renameCategory(UUID id, String newName) throws NotFoundException {
        Category category = categoryRepository.findByIdAndDeletableFalse(id);
        if (category == null) {
            throw new NotFoundException("Category not found with id: " + id);
        }
        category.setName(newName);
        return categoryRepository.save(category);
    }
    
}
