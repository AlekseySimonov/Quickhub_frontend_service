import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CompanyFeatures } from '../../../src/features/company';

describe('CompanyListSettings ', () => {
  let onSaveMock;
  let onCloseMock;

  beforeEach(() => {
    onSaveMock = jest.fn();
    onCloseMock = jest.fn();
    localStorage.clear();
  });

  test('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<CompanyFeatures.CompanyListSettings  onSave={onSaveMock} onClose={onCloseMock} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('loads default settings', () => {
    const { getByText } = render(<CompanyFeatures.CompanyListSettings  onSave={onSaveMock} onClose={onCloseMock} />);
    expect(getByText('Имя и фамилия')).toBeInTheDocument();
    expect(getByText('Рабочий телефон')).toBeInTheDocument();
  });

  test('checkbox state changes on click', () => {
    const { getByText } = render(<CompanyFeatures.CompanyListSettings  onSave={onSaveMock} onClose={onCloseMock} />);
    
    const fullNameCheckbox = getByText('Имя и фамилия').closest('.pop-up__checkbox');
    fireEvent.click(fullNameCheckbox);
    
    expect(fullNameCheckbox.querySelector('.checkbox__box').classList.contains('checked')).toBe(false);
    
    fireEvent.click(fullNameCheckbox);
    
    expect(fullNameCheckbox.querySelector('.checkbox__box').classList.contains('checked')).toBe(true);
  });

  test('calls onSave and onClose when saving', () => {
    const { getByText } = render(<CompanyFeatures.CompanyListSettings  onSave={onSaveMock} onClose={onCloseMock} />);
    
    fireEvent.click(getByText('Сохранить'));
    
    expect(onSaveMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('calls onClose when canceling', () => {
    const { getByText } = render(<CompanyFeatures.CompanyListSettings  onSave={onSaveMock} onClose={onCloseMock} />);
    
    fireEvent.click(getByText('Отменить'));
    
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('resets to default settings', () => {
    const { getByText } = render(<CompanyFeatures.CompanyListSettings  onSave={onSaveMock} onClose={onCloseMock} />);
    
    const vkCheckbox = getByText('Vk').closest('.pop-up__checkbox');
    fireEvent.click(vkCheckbox);
    
    fireEvent.click(getByText('По умолчанию'));
    
    expect(vkCheckbox.querySelector('.checkbox__box').classList.contains('checked')).toBe(false);
  });
});