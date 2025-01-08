import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
interface Video {
  id: number;
  video_path: string; // Update the property name to match the API response
  title: string;      // Ensure this matches the response structure
}

@Component({
  selector: 'app-add-class-details',
  templateUrl: './add-class-details.component.html',
  styleUrls: ['./add-class-details.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AddClassDetailsComponent {
  isFileModalOpen = false;
  isVideoLinkModalOpen = false;
  isMeetLinkModalOpen = false;

  newFile: File | null = null;
  newVideoLink: string = '';
  newVideoTitle: string = '';
  newMeetLink: string = '';
  courseId: number | null = null;
  group_id: number | null = null;

  groupDetails: any[] = []; 
  videoDetails: Video[] = [];
  fileDetails: any[] = [];
 
  

  // fileDetails = [
  //   { id: 1, url: 'https://example.com/file1', name: 'File 1' },
  //   { id: 2, url: 'https://example.com/file2', name: 'File 2' },
  //   { id: 2, url: 'https://example.com/file2', name: 'File 2' },
  //   { id: 2, url: 'https://example.com/file2', name: 'File 2' },
  //   { id: 2, url: 'https://example.com/file2', name: 'File 2' },
  //   { id: 2, url: 'https://example.com/file2', name: 'File 2' },
  //   { id: 2, url: 'https://example.com/file2', name: 'File 2' },
  //   { id: 2, url: 'https://example.com/file2', name: 'File 2' },
  //   { id: 2, url: 'https://example.com/file2', name: 'File 2' },
  // ];
  group: any;

  constructor(private http: HttpClient,private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract course_id from the URL
    this.route.params.subscribe((params) => {
      this.courseId = +params['id']; // Convert to number
      this.fetchGroupDetails();
      this.fetchVideoDetails(); 
      this.fetchFileDetails();
    });
  }

  fetchVideoDetails(): void {
    const token = localStorage.getItem('auth_token');
    if (token && this.courseId) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  
      const apiUrl = `https://api.classwix.com/api/courses/${this.courseId}/videos`;
  
      this.http.get<Video[]>(apiUrl, { headers }).subscribe(
        (response) => {
          console.log('Fetched video details:', response);
          this.videoDetails = response; // Directly assign the response since it's an array
        },
        (error) => {
          console.error('Error fetching video details:', error);
        }
      );
    } else {
      console.error('No token found or courseId is null');
    }
  }
  

  fetchGroupDetails() {
    this.http.get<any>('https://api.classwix.com/api/groups').subscribe(
      (data) => {
        console.log('Group details:', data);
        this.groupDetails = data.groups.map((group: any) => ({
          ...group,
          course: group.course || {}, // Ensure course exists to avoid errors
          users: group.users || [], // Ensure users array exists
        }));
        if (data.groups.length > 0) {
          this.group_id = data.groups[0].course_id; 
        }
      },
      (error) => {
        console.error('Error fetching group details:', error);
      }
    );
  }

  fetchFileDetails() {
    this.http.get<any>('https://api.classwix.com/api/files').subscribe(
      (data) => {
        console.log('file details:', data);
        this.fileDetails = data.files.map((group: any) => ({
        
        }));
       
      },
      (error) => {
        console.error('Error fetching group details:', error);
      }
    );
  }
  
  

  deleteVideo(id: number): void {
    this.videoDetails = this.videoDetails.filter((video) => video.id !== id);
  }

  deleteFile(id: number): void {
    this.fileDetails = this.fileDetails.filter((file) => file.id !== id);
  }

  openFileModal() {
    this.isFileModalOpen = true;
  }

  openVideoLinkModal() {
    this.isVideoLinkModalOpen = true;
  }

  openMeetLinkModal() {
    this.isMeetLinkModalOpen = true;
  }

  closeFileModal() {
    this.isFileModalOpen = false;
  }

  closeVideoLinkModal() {
    this.isVideoLinkModalOpen = false;
  }

  closeMeetLinkModal() {
    this.isMeetLinkModalOpen = false;
  }
  goBack() {
    window.history.back(); 
  }
  

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.newFile = input.files[0];
    }
  }

  submitFile() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const formData = new FormData();
      if (this.newFile) {
        formData.append('file', this.newFile);

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        this.http.post('https://api.classwix.com/api/uploadFile', formData, { headers }).subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
      }
      this.closeFileModal();
    } else {
      console.error('No token found in localStorage');
    }
  }

  submitVideoLink() {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  
      const payload = {
        video_link: this.newVideoLink,
        title: this.newVideoTitle,
        group_id: this.courseId,
        course_id: this.group_id,
        play_limit: 3
      };
  
      this.http.post('https://api.classwix.com/api/videos', payload, { headers })
        .subscribe(
          (response) => {
            console.log('Video link submitted successfully:', response);
          },
          (error) => {
            console.error('Error submitting video link:', error);
          }
        );
  
      this.closeVideoLinkModal();
    } else {
      console.error('No token found in localStorage');
    }
  }
  

  submitMeetLink() {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  
      const groupId = this.courseId;
  
      this.http.post(
        `https://api.classwix.com/api/groups/${groupId}/live-class`,
        { live_class_link: this.newMeetLink },
        { headers } // Pass headers here
      ).subscribe(
        response => {
          console.log('Live class link submitted successfully:', response);
          this.closeMeetLinkModal();
        },
        error => {
          console.error('Error submitting live class link:', error);
        }
      );
    } else {
      console.error('Authorization token is missing.');
    }
  }
  
}