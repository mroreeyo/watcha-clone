import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpPage from '../SignUpPage';

const renderSignUpPage = () => {
  return render(
    <BrowserRouter>
      <SignUpPage />
    </BrowserRouter>
  );
};

describe('SignUpPage', () => {
  beforeEach(() => {
    renderSignUpPage();
  });

  it('회원가입 페이지가 정상적으로 렌더링되는지 확인', () => {
    expect(screen.getByText('회원가입')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이름 (2자 이상)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이메일 (example@gmail.com)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호 (영문, 숫자, 특수 중 2개 조합 10자 이상)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '가입하기' })).toBeInTheDocument();
  });

  it('이름 입력 시 에러 메시지 표시', async () => {
    const nameInput = screen.getByPlaceholderText('이름 (2자 이상)');
    fireEvent.change(nameInput, { target: { value: '김' } });
    
    await waitFor(() => {
      expect(screen.getByText('이름은 2자 이상이어야 합니다.')).toBeInTheDocument();
    });
  });

  it('올바른 이름 입력 시 에러 메시지 제거', async () => {
    const nameInput = screen.getByPlaceholderText('이름 (2자 이상)');
    fireEvent.change(nameInput, { target: { value: '김철수' } });
    
    await waitFor(() => {
      expect(screen.queryByText('이름은 2자 이상이어야 합니다.')).not.toBeInTheDocument();
    });
  });

  it('이메일 입력 시 에러 메시지 표시', async () => {
    const emailInput = screen.getByPlaceholderText('이메일 (example@gmail.com)');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    await waitFor(() => {
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });
  });

  it('올바른 이메일 입력 시 에러 메시지 제거', async () => {
    const emailInput = screen.getByPlaceholderText('이메일 (example@gmail.com)');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    await waitFor(() => {
      expect(screen.queryByText('올바른 이메일 형식이 아닙니다.')).not.toBeInTheDocument();
    });
  });

  it('비밀번호 입력 시 에러 메시지 표시', async () => {
    const passwordInput = screen.getByPlaceholderText('비밀번호 (영문, 숫자, 특수 중 2개 조합 10자 이상)');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    
    await waitFor(() => {
      expect(screen.getByText('비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자 이상이어야 합니다.')).toBeInTheDocument();
    });
  });

  it('올바른 비밀번호 입력 시 에러 메시지 제거', async () => {
    const passwordInput = screen.getByPlaceholderText('비밀번호 (영문, 숫자, 특수 중 2개 조합 10자 이상)');
    fireEvent.change(passwordInput, { target: { value: 'Test1234!@#' } });
    
    await waitFor(() => {
      expect(screen.queryByText('비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자 이상이어야 합니다.')).not.toBeInTheDocument();
    });
  });

  it('전체 약관 동의 체크박스 동작 확인', () => {
    const allCheckbox = screen.getByLabelText('전체 약관에 동의합니다');
    fireEvent.click(allCheckbox);

    expect(screen.getByLabelText('만 14세 이상입니다')).toBeChecked();
    expect(screen.getByLabelText('왓챠 서비스 이용 약관 동의')).toBeChecked();
    expect(screen.getByLabelText('왓챠피디아 서비스 이용 약관 동의')).toBeChecked();
    expect(screen.getByLabelText('개인정보 수집 및 이용 동의')).toBeChecked();
    expect(screen.getByLabelText('마케팅 정보 수신 동의')).toBeChecked();
  });

  it('개별 약관 체크박스 동작 확인', () => {
    const ageCheckbox = screen.getByLabelText('만 14세 이상입니다');
    const serviceCheckbox = screen.getByLabelText('왓챠 서비스 이용 약관 동의');
    const watchapediaCheckbox = screen.getByLabelText('왓챠피디아 서비스 이용 약관 동의');
    const privacyCheckbox = screen.getByLabelText('개인정보 수집 및 이용 동의');
    const marketingCheckbox = screen.getByLabelText('마케팅 정보 수신 동의');

    fireEvent.click(ageCheckbox);
    fireEvent.click(serviceCheckbox);
    fireEvent.click(watchapediaCheckbox);
    fireEvent.click(privacyCheckbox);
    fireEvent.click(marketingCheckbox);

    expect(ageCheckbox).toBeChecked();
    expect(serviceCheckbox).toBeChecked();
    expect(watchapediaCheckbox).toBeChecked();
    expect(privacyCheckbox).toBeChecked();
    expect(marketingCheckbox).toBeChecked();
  });

  it('모든 필수 항목이 입력되고 필수 약관에 동의했을 때 가입하기 버튼 활성화', async () => {
    const nameInput = screen.getByPlaceholderText('이름 (2자 이상)');
    const emailInput = screen.getByPlaceholderText('이메일 (example@gmail.com)');
    const passwordInput = screen.getByPlaceholderText('비밀번호 (영문, 숫자, 특수 중 2개 조합 10자 이상)');
    const signUpButton = screen.getByRole('button', { name: '가입하기' });

    fireEvent.change(nameInput, { target: { value: '김철수' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test1234!@#' } });

    const ageCheckbox = screen.getByLabelText('만 14세 이상입니다');
    const serviceCheckbox = screen.getByLabelText('왓챠 서비스 이용 약관 동의');
    const watchapediaCheckbox = screen.getByLabelText('왓챠피디아 서비스 이용 약관 동의');
    const privacyCheckbox = screen.getByLabelText('개인정보 수집 및 이용 동의');

    fireEvent.click(ageCheckbox);
    fireEvent.click(serviceCheckbox);
    fireEvent.click(watchapediaCheckbox);
    fireEvent.click(privacyCheckbox);

    await waitFor(() => {
      expect(signUpButton).toHaveClass('active');
    });
  });
}); 